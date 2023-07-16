import { Router } from "express";

import { userController } from "../controllers/user.controller";
import {userMiddleware} from "../middlewares/user.middleware";

const router = Router();

router.get(
  "/",
  userController.findAll
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
router.post("/", userMiddleware.isCreateValid, userController.create);
router.get("/:id", userController.findById);
router.put("/:userId", userController.updateById);
router.delete("/:userId", userController.deleteById);

export const userRouter = router;
