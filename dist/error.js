export class ActionError extends Error {
    code;
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
export function raise(error, code) {
    throw new ActionError(error, code);
}
//# sourceMappingURL=error.js.map