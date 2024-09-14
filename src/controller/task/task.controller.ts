import { Router } from "express"
import { taskService } from "../../services/task/task.service";



class TaskController {

    public router: Router;

    constructor(){
        this.router = Router();
        this.create(this.router);
        this.list(this.router);
        this.detail(this.router);
        this.update(this.router);
        this.delete(this.router);
        this.completed(this.router);
    }

    private create = (router: Router):Router => {
       return router.post('/',taskService.create)
    }

    private list = (router: Router):Router => {
        return router.get('/',taskService.getAll)
    }

    private detail = (router: Router):Router => {    
        return router.get('/:id',taskService.getId)
    }

    private update = (router: Router):Router => {
        return router.put('/:id',taskService.update)
    }

    private delete = (router: Router):Router => {    
        return router.delete('/:id',taskService.delete)
    }

    private completed = (router: Router):Router => {    
        return router.put('/completed/:id',taskService.completed)
    }
}

export const taskController = new TaskController()