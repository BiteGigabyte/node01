export { Types } from "mongoose";

export interface IUser {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  _id: Types.ObjectId;
  name: string;
  age: number;
  gender: string;
  email: string;
  password: string;

  // _id: Types.ObjectId;
  // name?: string;
  // age?: number;
  // gender?: string;
  // email: string;
  // password: string;
}


export type IUserWithoutPassword = Omit<IUser, "password">