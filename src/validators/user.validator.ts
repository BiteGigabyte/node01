import Joi from "joi";

import { regexConstants } from "../constatns";
import { EGenders } from "../enums/user.enum";

export class UserValidator {
  static firstName = Joi.string().min(3).max(30).trim();
  static age = Joi.number().min(1).max(199).required();
  static gender = Joi.valid(EGenders).required();
  static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .trim()
    .required();
  static password = Joi.string()
    .regex(regexConstants.PASSWORD)
    .trim()
    .required();

  static create = Joi.object({
    firstName: this.firstName.required(),
    age: this.age,
    gender: this.gender,
    email: this.email,
    password: this.password,
  });
  static update = Joi.object({
    firstName: Joi.string().min(3).max(30).trim(),
    age: Joi.number().min(1).max(199),
    gender: Joi.valid(EGenders),
  });
}
