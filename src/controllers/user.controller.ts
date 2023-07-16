import { Request, Response } from "express";

import { User } from "../models/User.mode";
import { IUser } from "../types/user.type";

class UserController {
  public async findAll(
    req: Request,
    res: Response
  ): Promise<Response<IUser[]>> {
    try {
      const users = await User.find();
      // const users = await User.find().select('-password');

      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
}

export const userController = new UserController();
