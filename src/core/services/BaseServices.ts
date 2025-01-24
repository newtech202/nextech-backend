import { BadRequestError } from '../helpers/api.errors';
import { BaseRepository } from '../repositories/base.repository';

export abstract class BaseService<T, D> {
  protected repository: BaseRepository<T>;

  constructor(repository: BaseRepository<T>) {
    this.repository = repository;
  }

  async getAll(): Promise<T[]> {
    return this.repository.findAll();
  }


  private async ensureRecordExists(id: number): Promise<T> {
    // Verifica se o ID é um número válido


    const record = await this.repository.findById(id);
    if (!record) {
      throw new BadRequestError(`Registro com ID ${id} não encontrado.`);
    }
    return record;
  }

  async getById(id: number): Promise<T> {
    return this.ensureRecordExists(id);
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    if (!data) {
      throw new BadRequestError('Nenhum dado para atualizar');
    }
    if (typeof data !== 'object') {
      await this.ensureRecordExists(id);
      throw new BadRequestError('Os dados fornecidos não são válidos');
    }

    const keys = Object.keys(data);
    if (keys.length === 0) {
      throw new BadRequestError('Nenhum dado para atualizar');
    }

    if (keys.includes('id')) {
      throw new BadRequestError('O campo "id" não pode ser atualizado');
    }
    return this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.ensureRecordExists(id);
    await this.repository.delete(id);
  }
}
