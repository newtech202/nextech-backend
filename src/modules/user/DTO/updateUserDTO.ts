import * as Yup from 'yup';

export const UpdateUserDTO = Yup.object().shape({
  name: Yup.string().optional(),
  email: Yup.string().email().optional(),
  password: Yup.string().optional(),
  newPassword: Yup.string()
    .min(6, 'A nova senha deve ter pelo menos 6 caracteres')
    .when('password', {
      is: (password: string | undefined) => !!password, // Aplica a validação apenas se `password` existir
      then: (schema) =>
        schema.required('A nova senha é obrigatória ao alterar a senha atual'),
      otherwise: (schema) => schema.optional(),
    }),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), undefined], 'As senhas devem ser iguais')
    .when('newPassword', {
      is: (newPassword: string | undefined) => !!newPassword, // Aplica a validação apenas se `newPassword` existir
      then: (schema) =>
        schema.required('A confirmação da nova senha é obrigatória'),
      otherwise: (schema) => schema.optional(),
    }),
  profileId: Yup.number().optional(),
});

export type UpdateUserDTOType = Yup.InferType<typeof UpdateUserDTO>;
