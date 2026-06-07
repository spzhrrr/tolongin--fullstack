import { ReviewsRepository } from '../repositories/reviews.repository';
import { OrdersRepository } from '../../orders/repositories/orders.repository';
import { CreateReviewDto, UpdateReviewDto, ReplyReviewDto } from '../dto/review.dto';
import { PrismaService } from '../../../prisma/prisma.service';
export declare class ReviewsService {
    private readonly repo;
    private readonly ordersRepo;
    private readonly prisma;
    constructor(repo: ReviewsRepository, ordersRepo: OrdersRepository, prisma: PrismaService);
    private toDto;
    create(userId: string, dto: CreateReviewDto): Promise<any>;
    getBySeller(sellerId: string): Promise<any[]>;
    getByService(serviceId: string): Promise<any[]>;
    update(id: string, userId: string, dto: UpdateReviewDto): Promise<any>;
    delete(id: string, userId: string, role: string): Promise<{
        message: string;
    }>;
    reply(id: string, userId: string, dto: ReplyReviewDto): Promise<any>;
    markHelpful(id: string): Promise<any>;
}
