import catchAsync from '../../../helpers/catchAsync'
import type { Response, Request } from 'express'
import { loginDto, registerDto } from './auth.dto'
import { ErrorBadRequest } from '../../../helpers/errors'
import AuthService from './auth.service'

export const Registercontroller = catchAsync(
  async (req: Request, res: Response) => {
    const validatedBody = registerDto.safeParse(req.body)
    if (!validatedBody.success) {
      throw new ErrorBadRequest("Invalid input")
    }

    const { token, user } = await AuthService.Register(req.body)

    return res.json({ token, user })
  }
)

export const Logincontroller = catchAsync(
  async (req: Request, res: Response) => {
    const validatedBody = loginDto.safeParse(req.body)
    if (!validatedBody.success) {
      throw new ErrorBadRequest("Invalid input")
    }

    const { token, user } = await AuthService.Login(req.body)

    return res.json({ token, user })
  }
)