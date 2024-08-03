import express, {Application, json} from 'express';
import router from './routes/router';
import { config } from 'dotenv';
class Server {
    
    private app: Application;
    private port: number;
    public  key: string;
    constructor() {
      this.key = process.env.SECRET_KEY ?? '';
      this.app = express();
      this.port = process.env.PORT ? Number(process.env.PORT): 0o00;
      this.middlewares();
      this.routes();
      this.run();
      
    }
  
    
    private middlewares(): void {
      this.app.use(json());
    }
  
    private routes(): void {
      this.app.use('/api', router);
    }
  
    private run(): void {
      this.app.listen(this.port, () => {
        console.log(`Servidor rodando na porta http://localhost:${this.port}`);
      });
    }
  }

config()
const server = new Server();

export default server