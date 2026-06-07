import { CategoriesRepository } from '../repositories/categories.repository';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
export declare class CategoriesService {
    private readonly repo;
    constructor(repo: CategoriesRepository);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        name: string;
        slug: string;
        icon: string | null;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        slug: string;
        icon: string | null;
    }>;
    create(dto: CreateCategoryDto): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        slug: string;
        icon: string | null;
    }>;
    update(id: string, dto: UpdateCategoryDto): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        slug: string;
        icon: string | null;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
    getServices(id: string): Promise<{
        images: string[];
        seller: {
            id: string;
            name: string;
            avatar: string;
        };
        id: string;
        createdAt: Date;
        rating: number;
        reviewCount: number;
        isActive: boolean;
        updatedAt: Date;
        title: string;
        description: string;
        price: number;
        priceType: string;
        deliveryTime: number;
        revisionCount: number;
        isFeatured: boolean;
        viewCount: number;
        orderCount: number;
        categoryId: string;
        sellerId: string;
    }[]>;
    getJobs(id: string): Promise<{
        skills: string[];
        buyer: {
            id: string;
            name: string;
            avatar: string;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        viewCount: number;
        categoryId: string;
        budget: number;
        budgetType: string;
        deadline: Date | null;
        location: string | null;
        isOnline: boolean;
        status: string;
        applicationsCount: number;
        buyerId: string;
    }[]>;
}
