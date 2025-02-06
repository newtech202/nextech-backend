import * as Yup from 'yup';

export const ActualizarSenhaDoUsuarioDTO = Yup.object().shape({
  senha: Yup.string().optional().required(),
  novaSenha: Yup.string()
    .min(6, 'A nova senha deve ter pelo menos 6 caracteres').required(),
  confirmnovaSenha: Yup.string()
    .oneOf([Yup.ref('novaSenha'), undefined], 'As senhas devem ser iguais')
    .when('novaSenha', {
      is: (novaSenha: string | undefined) => !!novaSenha, // Aplica a validação apenas se `novaSenha` existir
      then: (schema) =>
        schema.required('A confirmação da nova senha é obrigatória'),
      otherwise: (schema) => schema.optional(),
    }),
  perfilId: Yup.number().optional(),
});

export type ActualizarSenhaDoUsuarioDTOType = Yup.InferType<typeof ActualizarSenhaDoUsuarioDTO>;
