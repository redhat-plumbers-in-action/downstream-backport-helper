import { debug, info, warning } from '@actions/core';
import { context } from '@actions/github';
import { Metadata } from './metadata';
export class Issue {
    octokit;
    number;
    metadata;
    constructor(octokit, number, metadata) {
        this.octokit = octokit;
        this.number = number;
        this.metadata = metadata;
    }
    async publishComment(content) {
        info(`Publishing comment to PR #${this.number}`);
        debug(`Comment content: ${JSON.stringify(content, null, 2)}`);
        if (this.metadata.commentID) {
            // Check if the comment is already up to date
            const currentComment = await this.getComment();
            if (JSON.stringify(currentComment) === JSON.stringify(content))
                return;
            // Update the comment
            this.updateComment(content);
            return;
        }
        const newCommentID = await this.createComment(content);
        if (!newCommentID) {
            warning(`Failed to create comment.`);
            return;
        }
        this.metadata.commentID = newCommentID;
        await this.metadata.setMetadata();
    }
    async getComment() {
        if (!this.metadata.commentID)
            return '';
        const comment = (await this.octokit.request('GET /repos/{owner}/{repo}/issues/comments/{comment_id}', {
            ...context.repo,
            comment_id: +this.metadata.commentID,
        })).data.body ?? '';
        return comment;
    }
    async createComment(body) {
        if (!body || body === '')
            return;
        const { data } = await this.octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
            ...context.repo,
            issue_number: this.number,
            body,
        });
        return data.id.toString();
    }
    async updateComment(body) {
        if (!this.metadata.commentID)
            return;
        await this.octokit.request('PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}', {
            ...context.repo,
            comment_id: +this.metadata.commentID,
            body,
        });
    }
    static async getIssue(octokit, issueNumber) {
        const { data } = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
            ...context.repo,
            issue_number: issueNumber,
        });
        return new this(octokit, issueNumber, await Metadata.getMetadata(issueNumber));
    }
}
//# sourceMappingURL=issue.js.map