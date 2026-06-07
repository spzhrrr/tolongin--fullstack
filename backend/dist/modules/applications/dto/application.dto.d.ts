export declare class CreateApplicationDto {
    jobId: string;
    coverLetter: string;
    proposedPrice: number;
    proposedDuration: number;
    portfolioIds?: string[];
}
export declare class UpdateApplicationDto {
    coverLetter?: string;
    proposedPrice?: number;
    proposedDuration?: number;
}
export declare class RejectApplicationDto {
    reason?: string;
}
