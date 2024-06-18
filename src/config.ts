import { debug, getInput } from '@actions/core';
import { context } from '@actions/github';
import deepmerge from 'deepmerge';

import { CustomOctokit } from './octokit';

import { configSchema, ConfigType } from './schema/config';

export class Config {
  static readonly defaults: Partial<ConfigType> = {
    'lookup-interval': 7,
  };
  downstream: ConfigType['downstream'];
  lookupInterval: ConfigType['lookup-interval'];

  constructor(config: unknown) {
    const parsedConfig = configSchema.parse(config);
    this.downstream = parsedConfig.downstream;
    this.lookupInterval = parsedConfig['lookup-interval'];
  }

  static async getConfig(octokit: CustomOctokit): Promise<Config> {
    const path = getInput('config-path', { required: true });

    const retrievedConfig = (
      await octokit.config.get({
        ...context.repo,
        path,
        defaults: configs =>
          deepmerge.all([this.defaults, ...configs]) as Partial<Config>,
      })
    ).config;

    debug(`Configuration '${path}': ${JSON.stringify(retrievedConfig)}`);

    if (Config.isConfigEmpty(retrievedConfig)) {
      throw new Error(
        `Missing configuration. Please setup 'Downstream Backport Helper' Action using '${getInput('config-path')}' file.`
      );
    }

    return new this(retrievedConfig);
  }

  static isConfigEmpty(config: unknown) {
    return config === null || config === undefined;
  }
}
