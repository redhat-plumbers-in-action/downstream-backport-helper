import { z } from 'zod';
export declare const downstreamSchema: z.ZodObject<{
    'git-server': z.ZodDefault<z.ZodString>;
    owner: z.ZodString;
    repo: z.ZodString;
    branches: z.ZodArray<z.ZodString, "many">;
    'status-title': z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    repo: string;
    'git-server': string;
    branches: string[];
    'status-title'?: string | undefined;
}, {
    owner: string;
    repo: string;
    branches: string[];
    'git-server'?: string | undefined;
    'status-title'?: string | undefined;
}>;
export declare const configSchema: z.ZodObject<{
    downstream: z.ZodArray<z.ZodObject<{
        'git-server': z.ZodDefault<z.ZodString>;
        owner: z.ZodString;
        repo: z.ZodString;
        branches: z.ZodArray<z.ZodString, "many">;
        'status-title': z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        owner: string;
        repo: string;
        'git-server': string;
        branches: string[];
        'status-title'?: string | undefined;
    }, {
        owner: string;
        repo: string;
        branches: string[];
        'git-server'?: string | undefined;
        'status-title'?: string | undefined;
    }>, "many">;
    'lookup-interval': z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    downstream: {
        owner: string;
        repo: string;
        'git-server': string;
        branches: string[];
        'status-title'?: string | undefined;
    }[];
    'lookup-interval': number;
}, {
    downstream: {
        owner: string;
        repo: string;
        branches: string[];
        'git-server'?: string | undefined;
        'status-title'?: string | undefined;
    }[];
    'lookup-interval'?: number | undefined;
}>;
export type ConfigType = z.infer<typeof configSchema>;
