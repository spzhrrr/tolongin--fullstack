import { ReviewsService } from '../services/reviews.service';
import { CreateReviewDto, UpdateReviewDto, ReplyReviewDto } from '../dto/review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(userId: string, dto: CreateReviewDto): Promise<any>;
    bySeller(sellerId: string): Promise<any[]>;
    byService(serviceId: string): Promise<any[]>;
    update(id: string, uid: string, dto: UpdateReviewDto): Promise<any>;
    delete(id: string, uid: string, role: string): Promise<{
        message: string;
    }>;
    reply(id: string, uid: string, dto: ReplyReviewDto): Promise<any>;
    helpful(id: string): Promise<any>;
}
