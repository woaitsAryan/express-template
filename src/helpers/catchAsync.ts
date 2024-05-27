import type { Request, Response, NextFunction } from 'express'

const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => {
      next(err)
    })
  }

export default catchAsync
