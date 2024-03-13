import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import * as cp from 'node:child_process';
import * as path from 'node:path';

import action from '../src/action';
import { CustomOctokit } from '../src/octokit';

describe('action tests', () => {
  beforeEach(() => {
    vi.stubEnv('INPUT_MILLISECONDS', '500');
    vi.stubEnv('INPUT_TOKEN', 'mock_token');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  test('throws invalid number', async () => {
    const input = parseInt('foo', 10);
    await expect(action({} as CustomOctokit, input)).rejects.toThrow(
      'milliseconds not a number'
    );
  });

  test('wait 500 ms', async () => {
    const start = new Date();
    await action({} as CustomOctokit, 500);
    const end = new Date();
    var delta = Math.abs(end.getTime() - start.getTime());
    expect(delta).toBeGreaterThan(450);
  });

  // shows how the runner will run a javascript action with env / stdout protocol
  test('test runs', async () => {
    const np = process.execPath;
    const ip = path.join(__dirname, '..', 'dist', 'index.js');
    const options: cp.ExecFileSyncOptions = {
      env: process.env,
    };
    console.log(cp.execFileSync(np, [ip], options).toString());
  });
});
