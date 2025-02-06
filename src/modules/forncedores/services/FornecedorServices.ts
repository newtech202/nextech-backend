import { Fornecedor, PrismaClient } from "@prisma/client";
import { validateData } from "../../../core/helpers/validate-data.dtos";
import { BaseService } from "../../../core/services/BaseServices";
import { EmpresaService } from "../../empresa/services/EmpresaServices";
import { CriarFornecedorDTO, CriarFornecedorDTOType } from "../DTO/criarFornecedorDTO";
import { FornecedorRepository } from "../repository/FornecedorRepository";


export class FornecedorService extends BaseService<Fornecedor, PrismaClient> {
    constructor(prisma: PrismaClient) {
        const fornecedorRepository = new FornecedorRepository(prisma);
        super(fornecedorRepository);
    }

    async create(data: CriarFornecedorDTOType, empresaService: EmpresaService): Promise<Fornecedor> {
        const {
            nif,
            email,
            endereco,
            empresaId,
            nome,
            telefone,
            logo
        } = data;

        // Validar os campos obrigatórios
        await validateData(data, CriarFornecedorDTO);

        // Verificar se já existe uma Fornecedor com o mesmo dados
        await this.ensureRecordExistsBy({ nif }, { haveToexist: false }, "Já existe uma Fornecedor com este nif.");
        await this.ensureRecordExistsBy({ email }, { haveToexist: false }, "Já existe uma Fornecedor com este email.");
        await this.ensureRecordExistsBy({ telefone }, { haveToexist: false }, "Já existe uma Fornecedor com este telefone.");

        // Verificar se a empresa existe
        await empresaService.getById(empresaId);

        const novaFornecedor = await this.repository.create(data);
        return novaFornecedor;
    }
    async listByEmpresaId(empresaId: number, data: { page?: number, limit?: number }): Promise<Fornecedor[]> {
        const { page = 1, limit = 10 } = data;
        const offset = (page - 1) * limit;
        const fornecedores = await this.repository.findAll({
            where: { empresaId },
            skip: offset,
            take: limit
        });
        return fornecedores
    }
}
