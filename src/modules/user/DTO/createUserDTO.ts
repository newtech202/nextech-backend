import * as Yup from 'yup';

export const CreateUserDTO = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
});
export type CreateUserDTOType = Yup.InferType<typeof CreateUserDTO>;