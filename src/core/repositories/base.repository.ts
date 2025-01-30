import { PrismaClient } from '@prisma/client';
import { BadRequestError } from '../helpers/api.errors';

export class BaseRepository<T> {
    protected prisma: PrismaClient;
    protected model: any;

    constructor(prisma: PrismaClient, model: any) {
        this.prisma = prisma;
        this.model = model;
    }

    async findAll(criteria?: Partial<any>): Promise<T[]> {
        return this.model.findMany({
            where: {...criteria}
        });
    }
    async getOneBy(criteria: any): Promise<any | null> {
        console.log("CRITERIO",criteria);
        
        return this.model.findFirst({
            where: {...criteria},
        });
    }

    async findById(id: number): Promise<T | null> {
        return this.model.findUnique({ where: { id } });
    }

    async create(data: Partial<T>): Promise<T> {
        return this.model.create({ data });
    }

    async update(id: number, data: Partial<T>): Promise<T> {
        const existingRecord = await this.model.findUnique({ where: { id } });
        if (!existingRecord) {
            throw new Error('Record not found.');
        }

        const updatedData = Object.keys(data).reduce((acc, key) => {
            if (data[key as keyof T] !== existingRecord[key as keyof T]) {
                acc[key as keyof T] = data[key as keyof T];
            }
            return acc;
        }, {} as Partial<T>);

        if (Object.keys(updatedData).length === 0) {
            throw new BadRequestError('No changes detected to update.');
        }

        return this.model.update({
            where: { id },
            data: updatedData
        });
        
    }

    async delete(id: number): Promise<void> {
        await this.model.delete({ where: { id } });
    }
}
