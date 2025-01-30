import * as Yup from 'yup';
import "../../../config/yup"; // Importação das extensões do Yup

// Definição do schema de validação para o DTO de criação de empresas
export const CriarEmpresaDTO = Yup.object().shape({
    nome: Yup.string().required(),
    email: Yup.string().email('E-mail inválido.').required('O e-mail é obrigatório.'),
    nif: Yup.string().required(),
    endereco: Yup.string().required(),
    planoId: Yup.number().required(),
    telefone: Yup.string().required(),
    logoURL: Yup.string().nullable(), // O campo logoURL é opcional e pode ser nulo
    regimeIvaId: Yup.number().required('O regime de IVA é obrigatório.'),
});

export type CriarEmpresaDTOType = Yup.InferType<typeof CriarEmpresaDTO>;
