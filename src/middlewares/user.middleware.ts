import { NextFunction } from "express";

import { ApiError } from "../errors";
import { UserValidator } from "../validators";

class UserMiddleware {
  public isCreateValid(req: any, res: Response, next: NextFunction) {
    try {
      const { error, value } = UserValidator.create.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);

        req.user = value;

        next();
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
