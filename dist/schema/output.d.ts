import { z } from 'zod';
export declare const prSchema: z.ZodObject<{
    number: z.ZodString;
    html_url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    number: string;
    html_url: string;
}, {
    number: string;
    html_url: string;
}>;
export declare const commitSchema: z.ZodObject<{
    upstream: z.ZodObject<{
        sha: z.ZodString;
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
        sha: string;
    }, {
        message: string;
        sha: string;
    }>;
    downstream: z.ZodString;
    branch: z.ZodString;
    tag: z.ZodString;
    pr: z.ZodOptional<z.ZodObject<{
        number: z.ZodString;
        html_url: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        number: string;
        html_url: string;
    }, {
        number: string;
        html_url: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    tag: string;
    branch: string;
    downstream: string;
    upstream: {
        message: string;
        sha: string;
    };
    pr?: {
        number: string;
        html_url: string;
    } | undefined;
}, {
    tag: string;
    branch: string;
    downstream: string;
    upstream: {
        message: string;
        sha: string;
    };
    pr?: {
        number: string;
        html_url: string;
    } | undefined;
}>;
export type Commit = z.infer<typeof commitSchema>;
export declare const downstreamSchema: z.ZodObject<{
    name: z.ZodString;
    alias: z.ZodOptional<z.ZodString>;
    commits: z.ZodArray<z.ZodObject<{
        upstream: z.ZodObject<{
            sha: z.ZodString;
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
            sha: string;
        }, {
            message: string;
            sha: string;
        }>;
        downstream: z.ZodString;
        branch: z.ZodString;
        tag: z.ZodString;
        pr: z.ZodOptional<z.ZodObject<{
            number: z.ZodString;
            html_url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            number: string;
            html_url: string;
        }, {
            number: string;
            html_url: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        tag: string;
        branch: string;
        downstream: string;
        upstream: {
            message: string;
            sha: string;
        };
        pr?: {
            number: string;
            html_url: string;
        } | undefined;
    }, {
        tag: string;
        branch: string;
        downstream: string;
        upstream: {
            message: string;
            sha: string;
        };
        pr?: {
            number: string;
            html_url: string;
        } | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    name: string;
    commits: {
        tag: string;
        branch: string;
        downstream: string;
        upstream: {
            message: string;
            sha: string;
        };
        pr?: {
            number: string;
            html_url: string;
        } | undefined;
    }[];
    alias?: string | undefined;
}, {
    name: string;
    commits: {
        tag: string;
        branch: string;
        downstream: string;
        upstream: {
            message: string;
            sha: string;
        };
        pr?: {
            number: string;
            html_url: string;
        } | undefined;
    }[];
    alias?: string | undefined;
}>;
export type Downstream = z.infer<typeof downstreamSchema>;
export declare const dataSchema: z.ZodObject<{
    pr: z.ZodString;
    downstream: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        alias: z.ZodOptional<z.ZodString>;
        commits: z.ZodArray<z.ZodObject<{
            upstream: z.ZodObject<{
                sha: z.ZodString;
                message: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                message: string;
                sha: string;
            }, {
                message: string;
                sha: string;
            }>;
            downstream: z.ZodString;
            branch: z.ZodString;
            tag: z.ZodString;
            pr: z.ZodOptional<z.ZodObject<{
                number: z.ZodString;
                html_url: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                number: string;
                html_url: string;
            }, {
                number: string;
                html_url: string;
            }>>;
        }, "strip", z.ZodTypeAny, {
            tag: string;
            branch: string;
            downstream: string;
            upstream: {
                message: string;
                sha: string;
            };
            pr?: {
                number: string;
                html_url: string;
            } | undefined;
        }, {
            tag: string;
            branch: string;
            downstream: string;
            upstream: {
                message: string;
                sha: string;
            };
            pr?: {
                number: string;
                html_url: string;
            } | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        commits: {
            tag: string;
            branch: string;
            downstream: string;
            upstream: {
                message: string;
                sha: string;
            };
            pr?: {
                number: string;
                html_url: string;
            } | undefined;
        }[];
        alias?: string | undefined;
    }, {
        name: string;
        commits: {
            tag: string;
            branch: string;
            downstream: string;
            upstream: {
                message: string;
                sha: string;
            };
            pr?: {
                number: string;
                html_url: string;
            } | undefined;
        }[];
        alias?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    pr: string;
    downstream: {
        name: string;
        commits: {
            tag: string;
            branch: string;
            downstream: string;
            upstream: {
                message: string;
                sha: string;
            };
            pr?: {
                number: string;
                html_url: string;
            } | undefined;
        }[];
        alias?: string | undefined;
    }[];
}, {
    pr: string;
    downstream: {
        name: string;
        commits: {
            tag: string;
            branch: string;
            downstream: string;
            upstream: {
                message: string;
                sha: string;
            };
            pr?: {
                number: string;
                html_url: string;
            } | undefined;
        }[];
        alias?: string | undefined;
    }[];
}>;
export type Data = z.infer<typeof dataSchema>;
