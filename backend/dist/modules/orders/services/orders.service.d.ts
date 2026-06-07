import { OrdersRepository } from '../repositories/orders.repository';
import { ServicesRepository } from '../../services/repositories/services.repository';
import { ApplicationsService } from '../../applications/services/applications.service';
import { CreateOrderFromServiceDto, CancelOrderDto, RevisionRequestDto } from '../dto/order.dto';
export declare class OrdersService {
    private readonly repo;
    private readonly servicesRepo;
    private readonly applicationsService;
    constructor(repo: OrdersRepository, servicesRepo: ServicesRepository, applicationsService: ApplicationsService);
    private toDto;
    private roleFor;
    private transition;
    createFromService(buyerId: string, serviceId: string, dto: CreateOrderFromServiceDto): Promise<any>;
    createFromApplication(buyerId: string, applicationId: string): Promise<any>;
    getById(id: string, userId: string, userRole: string): Promise<any>;
    listByBuyer(buyerId: string): Promise<any[]>;
    listBySeller(sellerId: string): Promise<any[]>;
    accept(id: string, userId: string, userRole: string): Promise<any>;
    start(id: string, userId: string, userRole: string): Promise<any>;
    submitReview(id: string, userId: string, userRole: string): Promise<any>;
    requestRevision(id: string, userId: string, userRole: string, dto: RevisionRequestDto): Promise<any>;
    complete(id: string, userId: string, userRole: string): Promise<any>;
    cancel(id: string, userId: string, userRole: string, dto: CancelOrderDto): Promise<any>;
    getTimeline(id: string, userId: string, userRole: string): Promise<any>;
    getInvoice(id: string, userId: string, userRole: string): Promise<{
        orderId: any;
        title: any;
        buyer: any;
        seller: any;
        amount: any;
        fee: any;
        total: any;
        status: any;
        issuedAt: any;
        paidAt: any;
    }>;
}
