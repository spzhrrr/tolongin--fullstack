import { DisputesRepository } from '../repositories/disputes.repository';
import { OrdersRepository } from '../../orders/repositories/orders.repository';
import { CreateDisputeDto, ResolveDisputeDto } from '../dto/dispute.dto';
export declare class DisputesService {
    private readonly repo;
    private readonly ordersRepo;
    constructor(repo: DisputesRepository, ordersRepo: OrdersRepository);
    private toDto;
    create(userId: string, dto: CreateDisputeDto): Promise<any>;
    findAll(): Promise<any[]>;
    findById(id: string): Promise<any>;
    resolve(id: string, adminId: string, dto: ResolveDisputeDto): Promise<any>;
    reject(id: string, adminId: string): Promise<any>;
}
