import { Router } from "express";
import { authRoutes } from "../modules/auth/routes/authRoutes";
import { perfilRoutes } from "../modules/perfil/routes/perfil.routes";
import { userRoutes } from "../modules/user/routes/userRoutes";

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/profiles', perfilRoutes)

routes.use('/auth', authRoutes)

const o = 4
export { routes };

