import { BaseRepository } from '../repositories/base.repository';

export abstract class BaseService<T, D> {
    protected repository: BaseRepository<T>;

    constructor(repository: BaseRepository<T>) {
        this.repository = repository;
    }

    async getAll(): Promise<T[]> {
        return this.repository.findAll();
    }

   

    async getById(id: number): Promise<T | null> {
        return this.repository.findById(id);
    }

     

    async update(id: string, data: Partial<T>): Promise<T> {
        return this.repository.update(id, data);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
