import * as Yup from 'yup';
import { BadRequestError } from './api.errors';

export const validateData = async (data: any, entitySchema: Yup.AnySchema): Promise<void> => {
    try {
        // Valida os dados com o schema fornecido
        await entitySchema.validate(data, { abortEarly: false });
    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            // Captura os erros específicos de validação do Yup e junta as mensagens
            throw new BadRequestError(error.errors.join(', ')); // Retorna as mensagens de erro separadas por vírgula
        } else {
            // Em caso de erro inesperado
            throw new BadRequestError('Erro de validação desconhecido');
        }
    }
}