import { warning, info } from '@actions/core';
import { execSync } from 'node:child_process';
export class Git {
    gitServer;
    repo;
    repoDir;
    repoUrl;
    constructor(gitServer, repo, repoDir = `abc_${repo}_cba`) {
        this.gitServer = gitServer;
        this.repo = repo;
        this.repoDir = repoDir;
        this.repoUrl = `${gitServer}/${repo}.git`;
    }
    clone() {
        const gitClone = `git clone ${this.repoUrl} ${this.repoDir}`;
        info(gitClone);
        // https://stackoverflow.com/a/57669219/10221282
        execSync(gitClone, {
            stdio: [0, 1, 2], // we need this so node will print the command output
        });
    }
    listBranches(list) {
        const glob = list.map(glob => `"${glob}"`).join(' ');
        const gitBranch = `git -C ${this.repoDir} --no-pager branch -r --list ${glob}`;
        info(gitBranch);
        let stdout = '';
        try {
            stdout = execSync(gitBranch).toString();
        }
        catch (error) {
            warning(`Unable to list branches - stderr: '${error}'`);
        }
        let branches = stdout.split('\n').map(branch => branch.trim());
        // Remove the last element if it is an empty string
        branches =
            branches[branches.length - 1] === '' ? branches.slice(0, -1) : branches;
        // When no branches are found, stdout will be an empty string. We want to return an empty array in this case
        return branches.length === 1 && branches[0] === '' ? [] : branches;
    }
    checkout(branch) {
        const gitCheckout = `git -C ${this.repoDir} checkout ${branch}`;
        info(gitCheckout);
        try {
            execSync(gitCheckout);
        }
        catch (error) {
            warning(`Unable to checkout branch - stderr: '${error}'`);
        }
    }
    log(interval) {
        const gitLog = `git -C ${this.repoDir} --no-pager log --pretty=format:"%H" --since="${interval} days ago"`;
        info(`${gitLog}`);
        let stdout = '';
        try {
            stdout = execSync(gitLog).toString();
        }
        catch (error) {
            warning(`Unable to grep git log - stderr: '${error}'`);
        }
        const commits = stdout.split('\n');
        // When no commits are found, stdout will be an empty string. We want to return an empty array in this case
        return commits.length === 1 && commits[0] === '' ? [] : commits;
    }
    describe(commit) {
        const gitDescribe = `git -C ${this.repoDir} describe --tags --first-parent --contains ${commit}`;
        info(gitDescribe);
        let stdout = '';
        try {
            stdout = execSync(gitDescribe).toString();
        }
        catch (error) {
            info(`Unable to describe commit - stderr: '${error}'`);
        }
        // Describe will return the tag name and number of commits since the tag, separated by a tilde. If commit is tagged it will be marked with a caret.
        return stdout.trim().split('~')[0].split('^')[0];
    }
}
//# sourceMappingURL=git.js.map