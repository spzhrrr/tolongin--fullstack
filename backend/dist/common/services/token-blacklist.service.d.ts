export declare class TokenBlacklistService {
    private blacklist;
    constructor();
    add(jti: string, exp: number): void;
    has(jti: string): boolean;
    private sweep;
}
