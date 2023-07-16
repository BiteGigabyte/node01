import { NextFunction, Request, Response, Router } from "express";

import { ApiError } from "../errors";
import { User } from "../models/User.mode";
import { IUser } from "../types/user.type";
import { UserValidator } from "../validators";

const router = Router();

router.get(
  "/",
  async (req: Request, res: Response): Promise<Response<IUser[]>> => {
    try {
      const users = await User.find();
      // const users = await User.find().select('-password');

      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
);

router.get(
  "/:id",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const user = await User.findById(req.params.id);

      return res.json(user);
    } catch (e) {
      console.log(e);
    }
  }
);

router.post(
  "/",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> => {
    // console.log(req.body);
    // users.push(req.body);

    try {
      const { error, value } = UserValidator.create.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 400);
      }

      const createdUser = await User.create(value);

      return res.status(201).json(createdUser);
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  "/:userId",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
);

router.delete(
  "/:userId",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> => {
    try {
      const { userId } = req.params;

      // const updatedUser = await User.updateOne({ _id: userId }, { ...req.body });
      await User.deleteOne({ _id: userId });

      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
);

export const userRouter = router;
