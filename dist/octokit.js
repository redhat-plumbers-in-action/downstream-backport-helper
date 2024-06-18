import { info, warning } from '@actions/core';
import { context } from '@actions/github';
import { Octokit } from '@octokit/core';
import { throttling } from '@octokit/plugin-throttling';
import { config } from '@probot/octokit-plugin-config';
const CustomOctokit = Octokit.plugin(config, throttling);
export function getOctokit(token) {
    return new CustomOctokit({
        auth: token,
        throttle: {
            onRateLimit: (retryAfter, options, _octokit, retryCount) => {
                warning(`Request quota exhausted for request ${options.method} ${options.url}`);
                // Retry once after hitting a rate limit error, then give up
                if (retryCount < 1) {
                    info(`Retrying after ${retryAfter} seconds!`);
                    return true;
                }
            },
            onSecondaryRateLimit: (_retryAfter, options, _octokit) => {
                // When a secondary rate limit is hit, don't retry
                warning(`SecondaryRateLimit detected for request ${options.method} ${options.url}`);
            },
        },
    });
}
export async function getCommitData(octokit, ref, owner = context.repo.owner, repo = context.repo.repo) {
    return octokit.request('GET /repos/{owner}/{repo}/commits/{ref}', {
        owner,
        repo,
        ref,
    });
}
export async function getPullRequestIntroducingCommit(octokit, sha, owner = context.repo.owner, repo = context.repo.repo) {
    const { data, status } = await octokit.request('GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls', {
        owner,
        repo,
        commit_sha: sha,
    });
    if (status !== 200) {
        return undefined;
    }
    // Check if PR is from the same repository
    return data.find((pr) => pr.base.repo.full_name === `${owner}/${repo}`);
}
//# sourceMappingURL=octokit.js.map