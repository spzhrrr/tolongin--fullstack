import type { BudgetType } from '../../../common/constants/enums';
export declare class CreateJobDto {
    title: string;
    description: string;
    categoryId: string;
    budget: number;
    budgetType?: BudgetType;
    deadline?: string;
    location?: string;
    isOnline?: boolean;
    skills?: string[];
}
export declare class UpdateJobDto {
    title?: string;
    description?: string;
    categoryId?: string;
    budget?: number;
    budgetType?: BudgetType;
    deadline?: string;
    location?: string;
    isOnline?: boolean;
    skills?: string[];
}
export declare class JobQueryDto {
    q?: string;
    categoryId?: string;
    buyerId?: string;
    status?: string;
    page?: number;
    limit?: number;
}
