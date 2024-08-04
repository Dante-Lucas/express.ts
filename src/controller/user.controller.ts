import {  Response, Router } from "express";
import  userService  from "../services/user/user.service";
import { vefiricar_token } from "../guard/user.guard";


class UserController {
    
    public router:Router 
    constructor() {
        this.router = Router()
        this.register(this.router)
        this.login(this.router)
        this.refresh(this.router)
        this.hello(this.router)
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
    private hello = (router: Router) => {
        router.get('/hello',vefiricar_token,(response: Response) => {
            return response.status(200).json({message:"hello"})    
        })
        
    }

}

const userController:UserController = new UserController()

export default userController