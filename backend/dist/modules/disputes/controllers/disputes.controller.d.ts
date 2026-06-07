import { DisputesService } from '../services/disputes.service';
import { CreateDisputeDto } from '../dto/dispute.dto';
export declare class DisputesController {
    private readonly disputesService;
    constructor(disputesService: DisputesService);
    create(uid: string, dto: CreateDisputeDto): Promise<any>;
    detail(id: string): Promise<any>;
}
