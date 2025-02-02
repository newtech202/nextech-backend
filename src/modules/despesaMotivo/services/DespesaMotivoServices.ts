import { DespesaMotivo, PrismaClient, } from '@prisma/client';
import { BadRequestError } from '../../../core/helpers/api.errors';
import { validateData } from '../../../core/helpers/validate-data.dtos';
import { BaseService } from '../../../core/services/BaseServices';
import { CriarDespesaMotivoDTO, CriarDespesaMotivoDTOType } from '../DTO/criarDespesaMotivolDTO';
import { DespesaMotivoRepository } from '../repository/DespesaMotivo.Repository';




export class DespesaMotivoService extends BaseService<DespesaMotivo, PrismaClient> {
    constructor(prisma: PrismaClient) {
        // Criando uma instância do repositório específico para o usuário e passando para o serviço base
        const despesaMotivoRepository = new DespesaMotivoRepository(prisma);
        super(despesaMotivoRepository,);
    }

    create = async (data: CriarDespesaMotivoDTOType): Promise<DespesaMotivo> => {
        const { motivo } = data

        await validateData(data, CriarDespesaMotivoDTO);
        const DespesaMotivoExist = this.getOneBy(motivo);

        if ((await DespesaMotivoExist)?.id) {
            throw new BadRequestError("Despesa Motivo Já existe")
        }

        // Criando um novo usuário com a senha criptografada
        const newDespesaMotivo = await this.repository.create({
            motivo
        });

        return newDespesaMotivo
    }
    async getOneBy(motivo: string): Promise<DespesaMotivo> {
        return this.repository.getOneBy({ motivo });
    }
}
