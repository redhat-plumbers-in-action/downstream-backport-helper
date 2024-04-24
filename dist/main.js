import { getInput, setFailed, setOutput } from '@actions/core';
import '@total-typescript/ts-reset';
import action from './action';
import { getOctokit } from './octokit';
import { ActionError } from './error';
const octokit = getOctokit(getInput('token', { required: true }));
try {
    let message = await action(octokit, +getInput('milliseconds', { required: true }));
    setOutput('status', JSON.stringify(message));
}
catch (error) {
    let message;
    if (error instanceof Error) {
        message = error.message;
    }
    else {
        message = JSON.stringify(error);
    }
    // set status output only if error was thrown by us
    if (error instanceof ActionError) {
        setOutput('status', JSON.stringify(message));
    }
    setFailed(message);
}
//# sourceMappingURL=main.js.map