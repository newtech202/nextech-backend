import * as Yup from 'yup';
import "../../../config/yup"; // Importação das extensões do Yup

// Definição do schema de validação para o DTO de criação de empresas
export const ActualizarEmpresaDTO = Yup.object().shape({
    nome: Yup.string().required('O nome é obrigatório.'),
    email: Yup.string().email('E-mail inválido.').required('O e-mail é obrigatório.'),
    nif: Yup.string().required('O NIF é obrigatório.'),
    endereco: Yup.string().required('O endereço é obrigatório.'),
    logoURL: Yup.string().nullable(), // O campo logoURL é opcional e pode ser nulo
    dataCriacao: Yup.date()
        .default(() => new Date())
        .required('A data de criação é obrigatória.'),
    regimeIvaId: Yup.string().required('O regime de IVA é obrigatório.'),
});

export type ActualizarEmpresaDTOType = Yup.InferType<typeof ActualizarEmpresaDTO>;
