import * as Yup from 'yup';

export const CriarUsuarioNoCadastroDTO = Yup.object().shape({
    nome: Yup.string().required(),
    email: Yup.string().email().required(),
    senha: Yup.string().min(6).required(),
    perfilId: Yup.number().required(),

});
export type CriarUsuarioNoCadastroDTOType = Yup.InferType<typeof CriarUsuarioNoCadastroDTO>;