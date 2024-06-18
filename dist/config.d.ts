import { CustomOctokit } from './octokit';
import { ConfigType } from './schema/config';
export declare class Config {
    static readonly defaults: Partial<ConfigType>;
    downstream: ConfigType['downstream'];
    lookupInterval: ConfigType['lookup-interval'];
    constructor(config: unknown);
    static getConfig(octokit: CustomOctokit): Promise<Config>;
    static isConfigEmpty(config: unknown): config is null | undefined;
}
