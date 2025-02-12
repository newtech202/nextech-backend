import { Cliente, PrismaClient } from "@prisma/client";
import { validateData } from "../../../core/helpers/validate-data.dtos";
import { BaseService } from "../../../core/services/BaseServices";
import { EmpresaService } from "../../empresa/services/EmpresaServices";
import { CriarClienteDTO, CriarClienteDTOType } from "../DTO/criarClienteDTO";
import { ClienteRepository } from "../repository/ClienteRepository";

export class ClienteService extends BaseService<Cliente, PrismaClient> {
    constructor(prisma: PrismaClient) {
        const clienteRepository = new ClienteRepository(prisma);
        super(clienteRepository);
    }
    async create(data: CriarClienteDTOType, empresaService: EmpresaService,): Promise<Cliente> {
        const {
            email,
            nif,
            empresaId,
        } = data;

        // Validar os campos obrigatórios
        await validateData(data, CriarClienteDTO);
        //VERIFICAR SE 

        // Verificar se já existe um Cliente com o mesmo nome
        // if (email) {
        //     await this.ensureRecordExistsBy({ email }, { haveToexist: false }, "Já existe uma Cliente com este email.");
        // }
        if (nif) {
            await this.ensureRecordExistsBy({ nif }, { haveToexist: false }, "Já existe uma Cliente com este NIF.");
        }
        // if (telefone) {
        //     await this.ensureRecordExistsBy({ telefone }, { haveToexist: false }, "Já existe uma Cliente com este telefone.");
        // }

        await empresaService.ensureRecordExistsBy({ id: empresaId }, { haveToexist: true }, "Empresa não encontrada.");

        const novaCliente = await this.repository.create(data);
        return novaCliente;
    }

}
