export declare class Git {
    readonly gitServer: string;
    readonly repo: string;
    readonly repoDir: string;
    readonly repoUrl: string;
    constructor(gitServer: string, repo: string, repoDir?: string);
    clone(): void;
    listBranches(list: string[]): string[];
    checkout(branch: string): void;
    log(interval: number): string[];
    describe(commit: string): string;
}
