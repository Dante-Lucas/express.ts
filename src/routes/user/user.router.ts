import  userController  from "../../controller/user/user.controller";
import { Router } from "express";

export const userRoutes:Router = Router();
userRoutes.use(userController.router);



