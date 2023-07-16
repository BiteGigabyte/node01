import { User } from "../models/User.mode";

class UserService {
  public async findAll() {
    return User.find().select("-password");
  }
}

export const userService = new UserService();
