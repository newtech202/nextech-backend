import * as Yup from 'yup';

export const SignupDTO = Yup.object().shape({
    nome: Yup.string().required(),
    email: Yup.string().email().required(),
    senha: Yup.string().min(6).required(),
    perfilId: Yup.number().required(),

});
export type SignupDTOType = Yup.InferType<typeof SignupDTO>;