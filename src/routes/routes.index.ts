import { Router } from "express";
import { authRoutes } from "../modules/auth/routes/authRoutes";
import { categoriaRoutes } from "../modules/categoria/routes/categoria.routes";
import { empresaRoutes } from "../modules/empresa/routes/empresaRoutes";
import { fornecedorRoutes } from "../modules/forncedores/routes/FornecedorRoutes";
import { perfilRoutes } from "../modules/perfil/routes/perfil.routes";
import { planoRoutes } from "../modules/Plano/routes/plano.routes";
import { userRoutes } from "../modules/user/routes/userRoutes";

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/profiles', perfilRoutes)
routes.use('/companies', empresaRoutes)
routes.use('/planos', planoRoutes) 
routes.use('/suppliers', fornecedorRoutes) 
routes.use('/categories', categoriaRoutes) 



routes.use('/auth', authRoutes)

const o = 4
export { routes };

