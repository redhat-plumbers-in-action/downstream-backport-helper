import { z } from 'zod';
export declare const commentIdKey = "downstream-backport-helper-comment-id";
export declare const issueMetadataObjectSchema: z.ZodObject<{
    "downstream-backport-helper-comment-id": z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    "downstream-backport-helper-comment-id"?: string | undefined;
}, {
    "downstream-backport-helper-comment-id"?: string | undefined;
}>;
export type IssueMetadataObject = z.infer<typeof issueMetadataObjectSchema>;
