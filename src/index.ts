import express, {Application, json} from 'express';
import router from './routes/router';
import { config } from 'dotenv';
class Server {
    
    private app: Application;
    private port: number;
    public  key: string;
    constructor() {
      this.key = String(process.env.SECRET_KEY);
      this.app = express();
      this.port = Number(process.env.PORT);
      this.middlewares();
      this.routes();
      this.run();
      
    }
  
    
    private middlewares = (): void =>  {
      this.app.use(json());
    }
  
    private routes = (): void => {
      this.app.use('/api', router)
    }
  
    private run = (): void => {
      this.app.listen(this.port, () => {
        console.log(`Servidor rodando na porta http://localhost:${this.port}`)
      })
    }
  }

config()
new Server()


