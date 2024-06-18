import { z } from 'zod';

export const commentIdKey = 'downstream-backport-helper-comment-id';

export const issueMetadataObjectSchema = z.object({
  [commentIdKey]: z.string().optional(),
});

export type IssueMetadataObject = z.infer<typeof issueMetadataObjectSchema>;
