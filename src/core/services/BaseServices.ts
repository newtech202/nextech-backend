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


  public async ensureRecordExistsById(id: number): Promise<T> {
    // Verifica se o ID é um número válido
    const record = await this.repository.findById(id);
    if (!record) {
      throw new BadRequestError(`Registro com ID ${id} não encontrado.`);
    }
    return record;
  }

  public async ensureRecordExistsBy(criteria: any, {haveToexist = false}, message?: string): Promise<T> {
    /**
     * @param criteria: any
     * @description: critérios de pesquisa
     *  @param message: string
     *  @description: mensagem de erro personalizada
     * @default: boolean requireToexist = false
     * @param haveToexist: boolean
     * @description:se true, verifica se o registro existe, se false, verifica se o registro não existe.
     * 
     */
    if (!criteria) {
      throw new BadRequestError('Nenhum critério de pesquisa fornecido');
    }

    if (typeof criteria !== 'object') {
      throw new BadRequestError('Os critérios fornecidos não são válidos');
    }
    if (haveToexist) {
      const record = await this.repository.getOneBy({ ...criteria });
      if (!record) {
        throw new BadRequestError(message || `Registro com o valor ${criteria} não encontrado.`);
      }
      return record;
    }
    const record = await this.repository.getOneBy({ ...criteria });
    if (record) {
      throw new BadRequestError(message || `Registro com o valor ${criteria} já existe.`);
    }
    return record;


  }

  async getById(id: number): Promise<T> {
    return this.ensureRecordExistsById(id);
  }

  async getOneBy(criateria: any): Promise<T> {
    return this.ensureRecordExistsBy(criateria, {haveToexist: true});
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    if (!data) {
      throw new BadRequestError('Nenhum dado para atualizar');
    }
    if (typeof data !== 'object') {
      await this.ensureRecordExistsById(id);
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
    await this.ensureRecordExistsById(id);
    await this.repository.delete(id);
  }
}
