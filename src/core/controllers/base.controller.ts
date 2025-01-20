import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import * as Yup from 'yup';
import { BaseService } from '../services/BaseServices';

export abstract class BaseController<T> {
    protected service: BaseService<T, PrismaClient>;  // Ajuste aqui
    protected entitySchemaCreate: Yup.AnySchema<T>;
    protected entitySchemaUpdate: Yup.AnySchema<T>;

    constructor(service: BaseService<T, PrismaClient>, entitySchemaCreate: Yup.AnySchema, entitySchemaUpdate: Yup.AnySchema) {
        this.service = service;
        this.entitySchemaCreate = entitySchemaCreate;
        this.entitySchemaUpdate = entitySchemaUpdate;
        this.entitySchemaUpdate = entitySchemaUpdate;
    }

    // Função para validar os dados antes de prosseguir
    private async validateData(data: any, entitySchema: Yup.AnySchema): Promise<void> {
        try {
            // Valida os dados com o schema fornecido
            await entitySchema.validate(data, { abortEarly: false });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                // Captura os erros específicos de validação do Yup e junta as mensagens
                throw new Error(error.errors.join(', ')); // Retorna as mensagens de erro separadas por vírgula
            } else {
                // Em caso de erro inesperado
                throw new Error('Erro de validação desconhecido');
            }
        }
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        const data = await this.service.getAll();
        return res.json(data);
    }

    async getById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const idFormated = Number(id)
        const data = await this.service.getById(idFormated);
        if (!data) return res.status(404).json({ error: 'Not found' });
        return res.json(data);
    }

    // Função para criar o item
    async create(req: Request, res: Response): Promise<Response> {
        try {
            // Validação dos dados recebidos na requisição
            await this.validateData(req.body, this.entitySchemaCreate);

            // Dados validados, então criamos o item
            const data = await this.service.create(req.body);

            // Retorno da resposta de sucesso com o item criado
            return res.status(201).json(data);
        } catch (error: unknown) {
            // Tratamento de erro mais detalhado
            if (error instanceof Error) {
                const errorMessage = error.message || 'Erro inesperado';
                return res.status(400).json({ error: errorMessage });
            } else {
                return res.status(400).json({ error: 'Erro desconhecido' });
            }
        }
    }

    // Função para atualizar o item
    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            // Validação dos dados recebidos na requisição
            await this.validateData(req.body, this.entitySchemaUpdate);
            const idFormated = Number(id)

            // Verifica se o item existe antes de atualizar
            const existingItem = await this.service.getById(idFormated);
            if (!existingItem) {
                return res.status(404).json({ error: 'Item não encontrado' });
            }

            // Dados validados, então atualizamos o item
            const updatedData = await this.service.update(id, req.body);

            // Retorno da resposta de sucesso com o item atualizado
            return res.status(200).json(updatedData);
        } catch (error: unknown) {
            // Tratamento de erro mais detalhado
            if (error instanceof Error) {
                const errorMessage = error.message || 'Erro inesperado';
                return res.status(400).json({ error: errorMessage });
            } else {
                return res.status(400).json({ error: 'Erro desconhecido' });
            }
        }
    } 

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        await this.service.delete(id);
        return res.status(204).send();
    }
}
