import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { User } from "../models/User.mode";
import { userService } from "../services/user.service";
import { IUser } from "../types/user.type";
import { UserValidator } from "../validators";

class UserController {
  public async findAll(
    req: Request,
    res: Response
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.findAll();
      // const users = await User.find().select('-password');

      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  }

  public async create(
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      // console.log(req.body);
      // users.push(req.body);
      const createdUser = await userService.create(req.user);

      return res.status(201).json(createdUser);
    } catch (e) {
      next(e);
    }
  }

  public async findById(req: Request, res: Response): Promise<Response<IUser>> {
    try {
      const user = await userService.findById(req.params.id);

      return res.json(user);
    } catch (e) {
      console.log(e);
    }
  }

  public async updateById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;

      const { error } = UserValidator.update.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 400);
      }

      // const updatedUser = await User.updateOne({ _id: userId }, { ...req.body });
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { ...req.body },
        { returnDocument: "after" }
      );

      res.status(200).json(updatedUser);
    } catch (e) {
      next(e);
    }
    // users[+userId] = req.body;
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { userId } = req.params;

      // const updatedUser = await User.updateOne({ _id: userId }, { ...req.body });
      await User.deleteOne({ _id: userId });

      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
