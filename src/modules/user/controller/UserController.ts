import { PrismaClient, User } from "@prisma/client";
import { BaseController } from "../../../core/controllers/base.controller";
import { CreateUserDTO } from "../DTO/createUserDTO";
import { UpdateUserDTO } from "../DTO/updateUserDTO";
import { UserService } from "../services/UserServices";

class UserController extends BaseController<User> {

    protected prisma = new PrismaClient()
    constructor(userService: UserService) {
        super(userService, CreateUserDTO, UpdateUserDTO)
    }

   
}

export default UserController;  // Exportação padrão
