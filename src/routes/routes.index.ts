import { Router } from "express";
import auth from "../middlewares/auth";
import { authRoutes } from "../modules/auth/routes/authRoutes";
import { categoriaRoutes } from "../modules/categoria/routes/categoria.routes";
import { despesaMotivoRoutes } from "../modules/despesaMotivo/routes/despesaMotivo.routes";
import { despesaRoutes } from "../modules/Despesas/routes/DespesasRoutes";
import { empresaRoutes } from "../modules/empresa/routes/empresaRoutes";
import { fornecedorRoutes } from "../modules/forncedores/routes/FornecedorRoutes";
import { perfilRoutes } from "../modules/perfil/routes/perfil.routes";
import { planoRoutes } from "../modules/Plano/routes/plano.routes";
import { userRoutes } from "../modules/user/routes/userRoutes";

const routes = Router()

routes.use('/auth', authRoutes)
routes.use(async (req, res, next) => {
    await auth(req, res, next)
});
routes.use('/users', userRoutes)
routes.use('/profiles', perfilRoutes)
routes.use('/companies', empresaRoutes)
routes.use('/planos', planoRoutes)
routes.use('/suppliers', fornecedorRoutes)
routes.use('/categories', categoriaRoutes)
routes.use('/expenses', despesaRoutes)
routes.use('/reason-expenses', despesaMotivoRoutes)


export { routes };

