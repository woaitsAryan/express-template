import { Router } from 'express'
import AuthController from './auth.controller'

const authRouter = Router()

export default (app: Router): void => {
  app.use('/auth', authRouter)

  authRouter.post('/login', AuthController.Login)
  authRouter.post('/register', AuthController.Register)
}
