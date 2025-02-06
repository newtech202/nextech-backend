import * as Yup from 'yup';
import '../../../config/yup';

export const SigninDTO = Yup.object().shape({
    email: Yup.string().email().required(),
    senha: Yup.string().min(6).required(),
});
export type SigninDTOType = Yup.InferType<typeof SigninDTO>;