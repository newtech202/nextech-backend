import * as Yup from 'yup';

export const UpdateUserPasswordDTO = Yup.object().shape({
  password: Yup.string().optional().required(),
  newPassword: Yup.string()
    .min(6, 'A nova senha deve ter pelo menos 6 caracteres').required(),
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

export type UpdateUserPasswordDTOType = Yup.InferType<typeof UpdateUserPasswordDTO>;
