import { Router } from 'express';
import { userRoutes } from './user/user.router';


const router:Router = Router()

router.use('/auth',userRoutes);


export default router