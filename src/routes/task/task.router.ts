import { Router } from "express";
import { taskController } from "../../controller/task/task.controller";

export const taskRoutes:Router = Router();

taskRoutes.use(taskController.router)