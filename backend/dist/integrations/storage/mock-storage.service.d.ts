import { IStorageService, UploadResult } from './storage.interface';
export declare class MockStorageService implements IStorageService {
    private readonly logger;
    uploadFile(buffer: Buffer, opts: {
        filename: string;
        contentType: string;
    }): Promise<UploadResult>;
    deleteFile(publicId: string): Promise<void>;
}
