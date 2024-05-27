import { Router } from 'express';
import { Logincontroller, Registercontroller } from './auth.controller';


const authRouter = Router();

export default (app: Router) => {
  app.use('/auth', authRouter);

  authRouter.post('/login', Logincontroller)

  authRouter.post('/register', Registercontroller)

}