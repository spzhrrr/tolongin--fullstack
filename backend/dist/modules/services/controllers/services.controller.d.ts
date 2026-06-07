import { ServicesService } from '../services/services.service';
import { CreateServiceDto, UpdateServiceDto, ServiceQueryDto } from '../dto/service.dto';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    findAll(query: ServiceQueryDto): Promise<{
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
    featured(): Promise<any[]>;
    recommended(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    create(sellerId: string, dto: CreateServiceDto): Promise<any>;
    update(id: string, userId: string, role: string, dto: UpdateServiceDto): Promise<any>;
    delete(id: string, userId: string, role: string): Promise<{
        message: string;
    }>;
    toggle(id: string, userId: string): Promise<{
        isActive: boolean;
    }>;
}
