import { Octokit } from '@octokit/core';
import { Endpoints } from '@octokit/types';
declare const CustomOctokit: typeof Octokit & import("@octokit/core/dist-types/types").Constructor<import("@probot/octokit-plugin-config").API>;
export type CustomOctokit = InstanceType<typeof CustomOctokit>;
export declare function getOctokit(token: string): Octokit & import("@probot/octokit-plugin-config").API;
export declare function getCommitData(octokit: CustomOctokit, ref: string, owner?: string, repo?: string): Promise<Endpoints['GET /repos/{owner}/{repo}/commits/{ref}']['response']>;
export declare function getPullRequestIntroducingCommit(octokit: CustomOctokit, sha: string, owner?: string, repo?: string): Promise<Endpoints['GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls']['response']['data'][number] | undefined>;
export {};
