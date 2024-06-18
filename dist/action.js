import { Config } from './config';
import { Git } from './git';
import { Issue } from './issue';
import { getCommitData, getPullRequestIntroducingCommit, } from './octokit';
import { getArrayIndex, getBranchUrl, getCherryPicks, getCommitUrl, getRepoUrl, getTagUrl, } from './util';
import { prSchema } from './schema/output';
import { startGroup, endGroup } from '@actions/core';
async function action(octokit) {
    const config = await Config.getConfig(octokit);
    let data = [];
    for (const downstream of config.downstream) {
        const DownstreamOwnerAndRepo = `${downstream.owner}/${downstream.repo}`;
        const git = new Git(downstream['git-server'], DownstreamOwnerAndRepo);
        startGroup(`Processing ${DownstreamOwnerAndRepo}`);
        git.clone();
        const branches = git.listBranches(downstream.branches);
        endGroup();
        let downstreamData = {
            name: DownstreamOwnerAndRepo,
            alias: downstream['status-title'],
            commits: [],
        };
        for (const branch of branches) {
            startGroup(`Processing branch ${branch}`);
            git.checkout(branch);
            const commits = git.log(config.lookupInterval);
            for (const commit of commits) {
                const downstreamCommit = (await getCommitData(octokit, commit, downstream.owner, downstream.repo)).data;
                const cherryPicks = getCherryPicks(downstreamCommit.commit.message);
                if (cherryPicks.length === 0) {
                    continue;
                }
                // Identify upstream commit
                let upstreamCommit = undefined;
                for (const cherryPick of cherryPicks) {
                    const { data, status } = await getCommitData(octokit, cherryPick);
                    if (status !== 200) {
                        continue;
                    }
                    upstreamCommit = {
                        sha: cherryPick,
                        message: data.commit.message,
                    };
                    // The first cherry-pick commit should be good enough.
                    break;
                }
                // No upstream reference found
                if (!upstreamCommit) {
                    continue;
                }
                // Identify upstream PR
                const prDataUnsafe = await getPullRequestIntroducingCommit(octokit, upstreamCommit.sha);
                const prDataParsed = prSchema.safeParse(prDataUnsafe);
                const prData = prDataParsed.success ? prDataParsed.data : undefined;
                downstreamData.commits.push({
                    downstream: commit,
                    upstream: upstreamCommit,
                    branch: branch.replace('origin/', ''),
                    tag: git.describe(commit),
                    pr: prData,
                });
            }
            endGroup();
        }
        data.push(downstreamData);
    }
    let db = [];
    for (const downstream of data) {
        for (const commit of downstream.commits) {
            if (!commit.hasOwnProperty('pr') || !commit.pr) {
                continue;
            }
            const index = getArrayIndex(db, 'pr', commit.pr.number);
            if (index === -1) {
                db.push({
                    pr: commit.pr.number,
                    downstream: [
                        {
                            name: downstream.name,
                            alias: downstream.alias,
                            commits: [commit],
                        },
                    ],
                });
                continue;
            }
            const downstreamIndex = getArrayIndex(db[index].downstream, 'name', downstream.name);
            if (downstreamIndex === -1) {
                db[index].downstream.push({
                    name: downstream.name,
                    alias: downstream.alias,
                    commits: [commit],
                });
                continue;
            }
            db[index].downstream[downstreamIndex].commits.push(commit);
        }
    }
    for (const pr of db) {
        let message = [];
        let introMessage = [];
        introMessage.push('## Stable Backport Notice\n');
        introMessage.push(`
> [!NOTE]
> Some commits from this PR were backported to the downstream stable repository.\n`);
        message.push(introMessage.join('\n'));
        for (const downstream of pr.downstream) {
            let downstreamMessage = [];
            downstreamMessage.push(`### [${downstream.alias ?? downstream.name}](${getRepoUrl(downstream.name)})\n`);
            downstreamMessage.push('| commit | backport | downstream | tag |\n|---|:---:|:---:|:---:|');
            for (const commit of downstream.commits) {
                downstreamMessage.push(`| ${getCommitUrl(commit.upstream.sha)} - _${commit.upstream.message}_ | ${getCommitUrl(commit.downstream, downstream.name)} | [\`${commit.branch}\`](${getBranchUrl(commit.branch, downstream.name)}) | ${commit.tag === ''
                    ? '`unreleased`'
                    : `[\`${commit.tag}\`](${getTagUrl(commit.tag, downstream.name)})`} |`);
            }
            downstreamMessage.push('\n');
            message.push(downstreamMessage.join('\n'));
        }
        const issue = await Issue.getIssue(octokit, +pr.pr);
        await issue.publishComment(message.join('\n---\n'));
    }
}
// TODO:
// - Add summary message
// - add support for labels
//! - add tests
export default action;
//# sourceMappingURL=action.js.map