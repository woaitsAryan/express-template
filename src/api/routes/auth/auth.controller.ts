import catchAsync from "../../../helpers/catchAsync";
import type { Response, Request } from "express";
import {
  loginDto,
  type loginDtoType,
  registerDto,
  type registerDtoType,
} from "./auth.dto";
import { ErrorBadRequest } from "../../../helpers/errors";
import { AuthService } from "./auth.service";

export const AuthController = {
  Register: catchAsync(async (req: Request, res: Response) => {
    const validatedBody = registerDto.safeParse(req.body);
    if (!validatedBody.success) {
      throw new ErrorBadRequest("Invalid input");
    }

    const { token, user } = await AuthService.Register(
      req.body as registerDtoType,
    );
    return res.json({ token, user });
  }),
  Login: catchAsync(async (req: Request, res: Response) => {
    const validatedBody = loginDto.safeParse(req.body);
    if (!validatedBody.success) {
      throw new ErrorBadRequest("Invalid input");
    }

    const { token, user } = await AuthService.Login(req.body as loginDtoType);
    return res.json({ token, user });
  }),
};
