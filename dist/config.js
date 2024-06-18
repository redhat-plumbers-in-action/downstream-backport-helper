import { debug, getInput } from '@actions/core';
import { context } from '@actions/github';
import deepmerge from 'deepmerge';
import { configSchema } from './schema/config';
export class Config {
    static defaults = {
        'lookup-interval': 7,
    };
    downstream;
    lookupInterval;
    constructor(config) {
        const parsedConfig = configSchema.parse(config);
        this.downstream = parsedConfig.downstream;
        this.lookupInterval = parsedConfig['lookup-interval'];
    }
    static async getConfig(octokit) {
        const path = getInput('config-path', { required: true });
        const retrievedConfig = (await octokit.config.get({
            ...context.repo,
            path,
            defaults: configs => deepmerge.all([this.defaults, ...configs]),
        })).config;
        debug(`Configuration '${path}': ${JSON.stringify(retrievedConfig)}`);
        if (Config.isConfigEmpty(retrievedConfig)) {
            throw new Error(`Missing configuration. Please setup 'Downstream Backport Helper' Action using '${getInput('config-path')}' file.`);
        }
        return new this(retrievedConfig);
    }
    static isConfigEmpty(config) {
        return config === null || config === undefined;
    }
}
//# sourceMappingURL=config.js.map