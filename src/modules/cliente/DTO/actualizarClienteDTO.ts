import * as Yup from 'yup';
import "../../../config/yup"; // Importação das extensões do Yup

// Definição do schema de validação para o DTO de criação de empresas
export const ActualizarClienteDTO = Yup.object().shape({
    nome: Yup.string().optional(),
    email: Yup.string().email('E-mail inválido.').optional(),
    tipoId: Yup.number().optional(),
    nif: Yup.string().optional(),
    endereco: Yup.string().optional(),
    telefone: Yup.string().optional(),
    logoUrl: Yup.string().nullable(), // O campo logoURL é opcional e pode ser nulo
});

export type ActualizarClienteDTOType = Yup.InferType<typeof ActualizarClienteDTO>;
