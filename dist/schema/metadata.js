import { z } from 'zod';
export const commentIdKey = 'downstream-backport-helper-comment-id';
export const issueMetadataObjectSchema = z.object({
    [commentIdKey]: z.string().optional(),
});
//# sourceMappingURL=metadata.js.map