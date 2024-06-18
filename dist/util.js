import { context } from '@actions/github';
export function getCherryPicks(message) {
    const regexp = /\n\(cherry picked from commit (\b[0-9a-f]{5,40}\b)\)/g;
    const matches = [...message.matchAll(regexp)];
    return Array.isArray(matches)
        ? matches.map(match => match[1].toString())
        : [];
}
export function getArrayIndex(array, key, value) {
    return array.findIndex(entry => entry[key] === value);
}
export function getRepoUrl(repoFullName = `${context.repo.owner}/${context.repo.repo}`) {
    return `https://github.com/${repoFullName}`;
}
export function getCommitUrl(sha, repoFullName = `${context.repo.owner}/${context.repo.repo}`) {
    return `${getRepoUrl(repoFullName)}/commit/${sha}`;
}
export function getBranchUrl(branch, repoFullName = `${context.repo.owner}/${context.repo.repo}`) {
    return `${getRepoUrl(repoFullName)}/tree/${branch}`;
}
export function getTagUrl(tag, repoFullName = `${context.repo.owner}/${context.repo.repo}`) {
    return `${getRepoUrl(repoFullName)}/releases/tag/${tag}`;
}
//# sourceMappingURL=util.js.map