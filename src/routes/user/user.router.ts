import  userController  from "../../controller/user/user.controller";
import { Router } from "express";

export const userRoutes:Router = Router();

userRoutes.post('',userController.register);
userRoutes.post('/login',userController.login);
userRoutes.post('/refresh',userController.refresh);

