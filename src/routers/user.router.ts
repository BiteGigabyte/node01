import { NextFunction, Request, Response, Router } from "express";

import { userController } from "../controllers/user.controller";
import { ApiError } from "../errors";
import { User } from "../models/User.mode";
import { IUser } from "../types/user.type";
import { UserValidator } from "../validators";

const router = Router();

router.get("/", userController.findAll
  // async (req: Request, res: Response): Promise<Response<IUser[]>> => {
  //   try {
  //     const users = await User.find();
  //     // const users = await User.find().select('-password');
  //
  //     return res.json(users);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // });
);
router.post("/", userController.create);
router.get("/:id", userController.findById);
router.put("/:userId", userController.updateById);
router.delete("/:userId", userController.deleteById);

export const userRouter = router;
