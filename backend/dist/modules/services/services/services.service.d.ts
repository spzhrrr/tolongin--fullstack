import { ServicesRepository } from '../repositories/services.repository';
import { CategoriesRepository } from '../../categories/repositories/categories.repository';
import { CreateServiceDto, UpdateServiceDto, ServiceQueryDto } from '../dto/service.dto';
export declare class ServicesService {
    private readonly repo;
    private readonly categoriesRepo;
    constructor(repo: ServicesRepository, categoriesRepo: CategoriesRepository);
    private toDto;
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
    findById(id: string): Promise<any>;
    create(sellerId: string, dto: CreateServiceDto): Promise<any>;
    update(id: string, userId: string, role: string, dto: UpdateServiceDto): Promise<any>;
    delete(id: string, userId: string, role: string): Promise<{
        message: string;
    }>;
    toggleActive(id: string, userId: string): Promise<{
        isActive: boolean;
    }>;
    featured(): Promise<any[]>;
    recommended(): Promise<any[]>;
}
