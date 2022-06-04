import { RequestHandler } from "express";
import UserModel from "../../models/Users/User.model";
import validateFields, { JOI } from "../../utils/validation";
import Joi from "joi";
import { PASSWORD_REGEX } from "../../config/auth";
import ResponseService from "../../utils/ResponseService";
import { TEXT } from "../../utils/JoiErrors";
import { USER_ROLES } from "../../constants/roles";

const validationSchema = JOI.object({
  email: Joi.string().strict().email().required(),
  password: Joi.string().strict().pattern(PASSWORD_REGEX).required(),
});

export const createModeratorController: RequestHandler = async (req, res) => {
  try {
    if (await validateFields(validationSchema, req, res)) return;

    const existingUser = await UserModel.findOne({
      email: req.body.email.toLowerCase(),
    });
    if (existingUser) {
      return ResponseService.error(res, 400, TEXT.ERRORS.userExists);
    }
    const newUser = await UserModel.create({
      ...req.body,
      role: USER_ROLES.MODERATOR,
      email: req.body.email.toLowerCase(),
    });

    const { _id, email, createdAt, updatedAt } = newUser.toObject();

    ResponseService.success(res, {
      _id,
      email,
      createdAt,
      updatedAt,
    });
  } catch (error: any) {
    ResponseService.error(res, 400, error.message);
  }
};

export default createModeratorController;
