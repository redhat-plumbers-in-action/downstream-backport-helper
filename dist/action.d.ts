import { CustomOctokit } from './octokit';
declare function action(octokit: CustomOctokit, milliseconds: number): Promise<string>;
export default action;
