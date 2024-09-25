import type { Request, Response, NextFunction } from "express";

const catchAsync =
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => {
      next(err);
    });
  };

export default catchAsync;
