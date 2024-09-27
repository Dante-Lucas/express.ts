import {  Request, Response, Router } from "express";
import  userService  from "../../services/user/user.service";
import { vefiricar_token } from "../../guard/user.guard";
import { Iuser } from "../../interface/user/user.interface";
import { Refresh } from "../../types/token";


class UserController {
    
    private service: typeof userService 
    constructor() {
     this.service = userService   
    }

    public register = (request:Request,response:Response) => {
        const user:Iuser = request.body
        return this.service.cadastro(user,response)
    }
    public login = (request:Request,response:Response) => {
        const user:Iuser = request.body
        return this.service.authentication(user,response)
    }
    public refresh = (request:Request,response:Response) => {
        const refresh:Refresh = request.body 
        return this.service.refresh(refresh,response)
    }
    

}




const userController = new UserController()

export default userController