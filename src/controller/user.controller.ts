import { Router } from "express";
import  userService  from "../services/user/user.service";


class UserController {
    
    public router:Router 
    constructor() {
        this.router = Router()
        this.register(this.router)
        this.login(this.router)
        this.refresh(this.router)
    }
    private register = (router: Router): void => {
        router.post('/register', userService.cadastro)
    }
    private login = (router: Router): void => {
        router.post('/login', userService.authentication)
    }
    private refresh = (router: Router): void => {
        router.post('/refresh', userService.refresh)
    }

}

const userController:UserController = new UserController()

export default userController