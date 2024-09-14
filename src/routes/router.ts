import { Router } from 'express';
import { userRoutes } from './user/user.router';
import { taskRoutes } from './task/task.router';

const router:Router = Router()

router.use('/auth',userRoutes);
router.use('/task',taskRoutes);

export default router