import * as Yup from 'yup';

export const CriarPlanoDTO = Yup.object().shape({
    nome: Yup.string().required(),
    descricao: Yup.string().optional(),
    valor: Yup.number().required(),
    periodo: Yup.number().required(),

});
export type CriarPlanoDTOType = Yup.InferType<typeof CriarPlanoDTO>;