import { z } from 'zod';

export const downstreamSchema = z.object({
  'git-server': z.string().url().default('https://github.com'),
  owner: z.string().min(1),
  repo: z.string().min(1),
  branches: z.array(z.string()).min(1),
  'status-title': z.string().optional(),
});

export const configSchema = z.object({
  downstream: z.array(downstreamSchema).min(1),
  'lookup-interval': z.coerce.number().positive().default(7),
});

export type ConfigType = z.infer<typeof configSchema>;
