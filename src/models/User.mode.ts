import { model, Schema } from "mongoose";

export enum EGenders {
  Male = "male",
  Female = "female",
  Other = "Other",
}

const userSchema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
    min: [1, "Minimum value for age is 1"],
    max: [199, "Maximum value for age is 199"],
  },
  gender: {
    type: String,
    enum: EGenders,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = model("user", userSchema);
