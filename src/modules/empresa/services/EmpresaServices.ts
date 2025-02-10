import { Empresa, PrismaClient } from "@prisma/client";
import { validateData } from "../../../core/helpers/validate-data.dtos";
import { BaseService } from "../../../core/services/BaseServices";
import { PlanoService } from "../../Plano/services/PlanoServices";
import { CriarEmpresaDTO, CriarEmpresaDTOType } from "../DTO/criarEmpresaDTO";
import { EmpresaRepository } from "../repository/EmpresaRepository";

export class EmpresaService extends BaseService<Empresa, PrismaClient> {
    constructor(prisma: PrismaClient) {
        const empresaRepository = new EmpresaRepository(prisma);
        super(empresaRepository);
    }

    async create(data: CriarEmpresaDTOType, planoService: PlanoService): Promise<Empresa> {
        const {
            email,
            endereco,
            nif,
            nome,
            planoId,
            telefone,
            regimeIvaId,
            proprietarioId,
            logoURL
        } = data;

        // Validar os campos obrigatórios
        await validateData(data, CriarEmpresaDTO);

        // Verificar se já existe uma empresa com o mesmo dados
        await this.ensureRecordExistsBy({ email }, { haveToexist: false }, "Já existe uma empresa com este email.");
        await this.ensureRecordExistsBy({ nif }, { haveToexist: false }, "Já existe uma empresa com este NIF.");
        await this.ensureRecordExistsBy({ nome }, { haveToexist: false }, "Já existe uma empresa com este nome.");
        await this.ensureRecordExistsBy({ telefone }, { haveToexist: false }, "Já existe uma empresa com este telefone.");
        await this.ensureRecordExistsBy({ proprietarioId }, { haveToexist: false }, "Já criou uma empresa.");

        // Verificar se nao existe um plano com referido id. o metodo getById retorna um erro caso nao exista
        await planoService.getById(planoId);

        const novaEmpresa = await this.repository.create({
            email,
            endereco,
            nif,
            nome,
            telefone,
            proprietarioId,
            logoURL,
            planoId,

        });
        return novaEmpresa;
    }

}
