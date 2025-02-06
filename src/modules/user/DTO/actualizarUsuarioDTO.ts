import * as Yup from 'yup';

export const ActualizarUsuarioDTO = Yup.object().shape({
  nome: Yup.string().optional(),
  email: Yup.string().email().optional(),
  senha: Yup.string().optional(),
  novaSenha: Yup.string()
    .min(6, 'A nova senha deve ter pelo menos 6 caracteres')
    .when('senha', {
      is: (senha: string | undefined) => !!senha, // Aplica a validação apenas se `senha` existir
      then: (schema) =>
        schema.required('A nova senha é obrigatória ao alterar a senha atual'),
      otherwise: (schema) => schema.optional(),
    }),
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

export type ActualizarUsuarioDTOType = Yup.InferType<typeof ActualizarUsuarioDTO>;
