import { PrismaClient, TipoDeCliente, } from '@prisma/client';
import { validateData } from '../../../core/helpers/validate-data.dtos';
import { BaseService } from '../../../core/services/BaseServices';
import { CriarTipoDeClienteDTO, CriarTipoDeClienteDTOType } from '../DTO/criarTipoDeClienteDTO';
import { TipoDeClienteRepository } from '../repository/TipoDeCliente.Repository';


export class TipoDeClienteService extends BaseService<TipoDeCliente, PrismaClient> {
    constructor(prisma: PrismaClient) {
        // Criando uma instância do repositório específico para o usuário e passando para o serviço base
        const tipoDeClienteRepository = new TipoDeClienteRepository(prisma);
        super(tipoDeClienteRepository,);
    }

    create = async (data: CriarTipoDeClienteDTOType): Promise<TipoDeCliente> => {
        const { tipo } = data

        // Validar os dados recebidos do cliente para garantir que estão corretos
        await validateData(data, CriarTipoDeClienteDTO);

        // Verificar se já existe um tipo de cliente com o mesmo tipo
        await this.ensureRecordExistsBy({ tipo }, { haveToexist: false }, "Já existe um tipo de cliente com este tipo.");

        // Criando um novo usuário com a senha criptografada
        const newTipoDeCliente = await this.repository.create({
            tipo
        });

        return newTipoDeCliente
    }
    async getOneBy(tipo: string): Promise<TipoDeCliente> {
        return this.repository.getOneBy({ tipo });
    }
}
