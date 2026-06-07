import { OrdersService } from '../services/orders.service';
import { CancelOrderDto, CreateOrderFromServiceDto, RevisionRequestDto } from '../dto/order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    fromService(serviceId: string, buyerId: string, userRole: string, dto: CreateOrderFromServiceDto): Promise<any>;
    fromApplication(applicationId: string, buyerId: string, userRole: string): Promise<any>;
    listMine(userId: string, role: string, filter?: string): Promise<any[]>;
    buyerOrders(buyerId: string): Promise<any[]>;
    sellerOrders(sellerId: string): Promise<any[]>;
    detail(id: string, userId: string, role: string): Promise<any>;
    accept(id: string, uid: string, role: string): Promise<any>;
    start(id: string, uid: string, role: string): Promise<any>;
    submitReview(id: string, uid: string, role: string): Promise<any>;
    revision(id: string, uid: string, role: string, dto: RevisionRequestDto): Promise<any>;
    complete(id: string, uid: string, role: string): Promise<any>;
    cancel(id: string, uid: string, role: string, dto: CancelOrderDto): Promise<any>;
    setStatus(id: string, uid: string, role: string, body: {
        status?: string;
        reason?: string;
    }): Promise<any>;
    timeline(id: string, uid: string, role: string): Promise<any>;
    invoice(id: string, uid: string, role: string): Promise<{
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
