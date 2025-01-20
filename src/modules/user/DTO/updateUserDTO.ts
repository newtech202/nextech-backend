import * as Yup from 'yup';

export const UpdateUserDTO = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
});
export type UpdateUserDTOType = Yup.InferType<typeof UpdateUserDTO>;