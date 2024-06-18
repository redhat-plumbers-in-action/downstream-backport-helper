export declare function getCherryPicks(message: string): string[];
export declare function getArrayIndex<T>(array: T[], key: keyof T, value: T[keyof T]): number;
export declare function getRepoUrl(repoFullName?: string): string;
export declare function getCommitUrl(sha: string, repoFullName?: string): string;
export declare function getBranchUrl(branch: string, repoFullName?: string): string;
export declare function getTagUrl(tag: string, repoFullName?: string): string;
