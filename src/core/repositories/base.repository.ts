import { PrismaClient } from '@prisma/client';

export class BaseRepository<T> {
    protected prisma: PrismaClient;
    protected model: any;

    constructor(prisma: PrismaClient, model: any) {
        this.prisma = prisma;
        this.model = model;
    }

    async findAll(criteria?: Partial<any>): Promise<T[]> {
        return this.model.findMany({
            where: criteria
        });
    }
    async getOneBy(criteria: any): Promise<any | null> {
        return this.model.findFirst({
            where: criteria,
        });
    }

    async findById(id: number): Promise<T | null> {
        return this.model.findUnique({ where: { id } });
    }

    async create(data: Partial<T>): Promise<T> {
        return this.model.create({ data });
    }

    async update(id: string, data: Partial<T>): Promise<T> {
        return this.model.update({
            where: { id },
            data
        });
    }

    async delete(id: string): Promise<void> {
        await this.model.delete({ where: { id } });
    }
}
