import express,{Express} from 'express'
import cors from 'cors'
import { errorMiddleware } from './middlewares/errorMiddleware';

export const expressApp = (app: Express) => {
   app.use(express.json({ limit: "1mb" }));
   app.use(express.urlencoded({ extended: true }));
   app.use(
     cors({
       origin: "*",
     })
   );
  //  routes
   app.use()
   app.use(errorMiddleware);
}; 