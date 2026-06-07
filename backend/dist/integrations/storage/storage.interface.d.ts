export interface UploadResult {
    url: string;
    publicId: string;
    size: number;
    contentType: string;
}
export interface IStorageService {
    uploadFile(buffer: Buffer, opts: {
        filename: string;
        contentType: string;
    }): Promise<UploadResult>;
    deleteFile(publicId: string): Promise<void>;
}
export declare const STORAGE_SERVICE: unique symbol;
