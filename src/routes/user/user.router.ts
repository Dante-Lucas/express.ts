import  userController  from "../../controller/user.controller";
import { Router } from "express";

export const userRoutes:Router = Router();
userRoutes.use(userController.router);



