import { z } from 'zod';

export const prSchema = z.object({
  number: z.coerce.string(),
  html_url: z.string(),
});

export const commitSchema = z.object({
  upstream: z.object({
    sha: z.string(),
    message: z.string(),
  }),
  downstream: z.string(),
  branch: z.string(),
  tag: z.string(),
  pr: prSchema.optional(),
});

export type Commit = z.infer<typeof commitSchema>;

export const downstreamSchema = z.object({
  name: z.string(),
  alias: z.string().optional(),
  commits: z.array(commitSchema),
});

export type Downstream = z.infer<typeof downstreamSchema>;

export const dataSchema = z.object({
  pr: z.string(),
  downstream: z.array(downstreamSchema),
});

export type Data = z.infer<typeof dataSchema>;
