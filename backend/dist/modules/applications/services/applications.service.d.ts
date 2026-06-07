import { ApplicationsRepository } from '../repositories/applications.repository';
import { JobsRepository } from '../../jobs/repositories/jobs.repository';
import { CreateApplicationDto, UpdateApplicationDto, RejectApplicationDto } from '../dto/application.dto';
export declare class ApplicationsService {
    private readonly repo;
    private readonly jobsRepo;
    constructor(repo: ApplicationsRepository, jobsRepo: JobsRepository);
    private toDto;
    apply(sellerId: string, dto: CreateApplicationDto): Promise<any>;
    getMySellerApplications(sellerId: string): Promise<any[]>;
    getJobApplications(jobId: string, buyerId: string): Promise<any[]>;
    update(id: string, sellerId: string, dto: UpdateApplicationDto): Promise<any>;
    withdraw(id: string, sellerId: string): Promise<any>;
    accept(id: string, buyerId: string): Promise<any>;
    reject(id: string, buyerId: string, dto: RejectApplicationDto): Promise<any>;
    findById(id: string): import(".prisma/client").Prisma.Prisma__ApplicationClient<{
        job: {
            buyer: {
                id: string;
                name: string;
                avatar: string;
            };
        } & {
            id: string;
            createdAt: Date;
            skills: string;
            updatedAt: Date;
            title: string;
            description: string;
            viewCount: number;
            categoryId: string;
            budget: number;
            budgetType: string;
            deadline: Date | null;
            location: string | null;
            isOnline: boolean;
            status: string;
            applicationsCount: number;
            buyerId: string;
        };
        seller: {
            id: string;
            name: string;
            avatar: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sellerId: string;
        status: string;
        coverLetter: string;
        proposedPrice: number;
        proposedDuration: number;
        portfolioIds: string;
        rejectionReason: string | null;
        reviewedAt: Date | null;
        jobId: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
}
