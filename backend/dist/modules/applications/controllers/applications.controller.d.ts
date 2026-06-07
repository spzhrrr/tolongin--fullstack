import { ApplicationsService } from '../services/applications.service';
import { CreateApplicationDto, UpdateApplicationDto, RejectApplicationDto } from '../dto/application.dto';
export declare class ApplicationsController {
    private readonly applicationsService;
    constructor(applicationsService: ApplicationsService);
    apply(sellerId: string, dto: CreateApplicationDto): Promise<any>;
    mySeller(sellerId: string): Promise<any[]>;
    forJob(jobId: string, buyerId: string): Promise<any[]>;
    update(id: string, sellerId: string, dto: UpdateApplicationDto): Promise<any>;
    withdraw(id: string, sellerId: string): Promise<any>;
    accept(id: string, buyerId: string): Promise<any>;
    reject(id: string, buyerId: string, dto: RejectApplicationDto): Promise<any>;
}
