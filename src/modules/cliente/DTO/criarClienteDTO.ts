import * as Yup from 'yup';
import "../../../config/yup"; // Importação das extensões do Yup

// Definição do schema de validação para o DTO de criação de empresas
export const CriarClienteDTO = Yup.object().shape({
    nome: Yup.string().required(),
    email: Yup.string().email('E-mail inválido.').optional(),
    tipoId: Yup.number().required(),
    nif: Yup.string().optional(),
    endereco: Yup.string().optional(),
    registadoPor: Yup.string().required(),
    empresaId: Yup.number().optional(),
    telefone: Yup.string().optional(),
    logoUrl: Yup.string().nullable(), // O campo logoURL é opcional e pode ser nulo
});

export type CriarClienteDTOType = Yup.InferType<typeof CriarClienteDTO>;
