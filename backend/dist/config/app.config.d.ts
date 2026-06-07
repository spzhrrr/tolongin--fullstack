declare const _default: (() => {
    port: number;
    nodeEnv: string;
    corsOrigin: string;
    jwt: {
        secret: string;
        accessExpiresIn: string;
        refreshExpiresIn: string;
        expiresIn: string;
    };
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    port: number;
    nodeEnv: string;
    corsOrigin: string;
    jwt: {
        secret: string;
        accessExpiresIn: string;
        refreshExpiresIn: string;
        expiresIn: string;
    };
}>;
export default _default;
