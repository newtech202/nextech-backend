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

    async create(data: CriarClienteDTOType, empresaService: EmpresaService): Promise<Cliente> {
        const {
            nome,
            email,
            endereco,
            nif,
            telefone,
            logoUrl,
            empresaId,
        } = data;

        // Validar os campos obrigatórios
        await validateData(data, CriarClienteDTO);

        if (email) {
            await this.ensureRecordExistsBy({ email }, { haveToexist: false }, "Já existe uma Cliente com este email.");
        }
        if (nif) {
            await this.ensureRecordExistsBy({ nif }, { haveToexist: false }, "Já existe uma Cliente com este NIF.");
        }

        await this.ensureRecordExistsBy({ nome }, { haveToexist: false }, "Já existe uma Cliente com este nome.");

        if (telefone) {
            await this.ensureRecordExistsBy({ telefone }, { haveToexist: false }, "Já existe uma Cliente com este telefone.");
        }


        await empresaService.ensureRecordExistsBy({ id: empresaId }, { haveToexist: true }, "Empresa não encontrada.");
        
        const novaCliente = await this.repository.create({
            email,
            endereco,
            nome,
            telefone,
            empresaId,
            logoUrl,

        });
        return novaCliente;
    }

}
