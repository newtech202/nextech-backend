import { Plano, PrismaClient, } from '@prisma/client';
import { BadRequestError } from '../../../core/helpers/api.errors';
import { validateData } from '../../../core/helpers/validate-data.dtos';
import { BaseService } from '../../../core/services/BaseServices';
import { CriarPlanoDTO, CriarPlanoDTOType } from '../DTO/criarPlanoDTO';
import { PlanoRepository } from '../repository/Plano.Repository';



export class PlanoService extends BaseService<Plano, PrismaClient> {
    constructor(prisma: PrismaClient) {
        // Criando uma instância do repositório específico para o usuário e passando para o serviço base
        const planoRepository = new PlanoRepository(prisma);
        super(planoRepository,);
    }

    create = async (data: CriarPlanoDTOType): Promise<Plano> => {
        const { nome, descricao, } = data

        await validateData(data, CriarPlanoDTO);
        const PlanoExist = this.getOneBy(nome);

        if ((await PlanoExist)?.id) {
            throw new BadRequestError("Plano Já existe")
        }

        // Criando um novo usuário com a senha criptografada
        const newPlano = await this.repository.create({
            ...data,
            periodo: data.periodo.toString()
        });

        return newPlano
    }
    async getOneBy(nome: string): Promise<Plano> {
        return this.repository.getOneBy({ nome });
    }
}
