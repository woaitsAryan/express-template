import { ErrorBadRequest } from '../../../helpers/errors'
import { type loginDtoType, type registerDtoType } from './auth.dto'
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User, { type UserType } from '../../../models/user'
import envHandler from '../../../config/envHandler'

export default class AuthService {
  public static async Register (registerDto: registerDtoType): Promise<{ token: string, user: UserType }> {
    const existingUser = await User.findOne({ email: registerDto.email })
    if (existingUser != null) {
      throw new ErrorBadRequest('Email already exists')
    }
    const salt = randomBytes(16).toString('hex')
    const hashedpassword = scryptSync(registerDto.password, salt, 32).toString('hex') + salt
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      passwordHash: hashedpassword,
      email: registerDto.email,
      name: registerDto.name
    })
    await newUser.save()
    const token = jwt.sign({ userID: newUser._id }, envHandler.JWT_KEY, {
      expiresIn: '30d'
    })

    return { token, user: newUser }
  }

  public static async Login (loginDto: loginDtoType): Promise<{ token: string, user: UserType }> {
    const user = await User.findOne({ email: loginDto.email })
    if (user === null) {
      throw new ErrorBadRequest('Invalid username or password')
    }
    const salt = user.passwordHash.slice(64)
    const originalHash = user.passwordHash.slice(0, 64)
    const hashedPassword = scryptSync(loginDto.password, salt, 32).toString('hex')
    const result = timingSafeEqual(Buffer.from(originalHash), Buffer.from(hashedPassword))
    if (!result) {
      throw new ErrorBadRequest('Invalid username or password')
    }
    const token = jwt.sign({ userID: user._id }, envHandler.JWT_KEY, {
      expiresIn: '30d'
    })
    return { token, user }
  }
}
