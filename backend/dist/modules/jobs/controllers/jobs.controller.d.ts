import { JobsService } from '../services/jobs.service';
import { CreateJobDto, UpdateJobDto, JobQueryDto } from '../dto/job.dto';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    findAll(query: JobQueryDto): Promise<{
        data: any[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    }>;
    findOne(id: string): Promise<any>;
    create(buyerId: string, dto: CreateJobDto): Promise<any>;
    update(id: string, userId: string, role: string, dto: UpdateJobDto): Promise<any>;
    delete(id: string, userId: string, role: string): Promise<{
        message: string;
    }>;
    close(id: string, userId: string): Promise<any>;
}
