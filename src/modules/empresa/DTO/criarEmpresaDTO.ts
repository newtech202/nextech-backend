import * as Yup from "yup";
import "../../../config/yup";
export const CriarEmpresaDTO = Yup.object().shape({
    nome: Yup.string().required(),
    logo: Yup.string().optional(),
    email: Yup.string().email().required(),
    telefone: Yup.string()
        .matches(/^[0-9]{9,15}$/, "O telefone deve conter entre 9 e 15 dígitos.")
        .required(),
    nif: Yup.string()
        .matches(/^\d{9}$/, "O NIF deve conter exatamente 9 dígitos.")
        .required(),
    endereco: Yup.string().optional(),
    proprietarioId: Yup.number().required(),

    // status: Yup.string().oneOf(["ativo", "inativo"], "O status deve ser 'ativo' ou 'inativo'.").optional(),
});

export type CriarEmpresaDTOType = Yup.InferType<typeof CriarEmpresaDTO>;
