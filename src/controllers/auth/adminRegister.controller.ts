import { RequestHandler } from "express";
import { PASSWORD_REGEX } from "../../config/auth";
import UserModel from "../../models/Users/User.model";
import { TEXT } from "../../utils/JoiErrors";
import ResponseService from "../../utils/ResponseService";
import validateFields, { JOI } from "../../utils/validation";
import { USER_ROLES } from "../../constants/roles";
import Joi from "joi";

const validationSchema = JOI.object({
  email: Joi.string().strict().email().required(),
  password: Joi.string().strict().pattern(PASSWORD_REGEX).required(),
});

const adminRegisterController: RequestHandler = async (req, res) => {
  if (await validateFields(validationSchema, req, res)) return;

  try {
    const existingAdmin = await UserModel.findOne({
      role: USER_ROLES.ADMIN,
    });
    if (existingAdmin) {
      return ResponseService.error(res, 400, TEXT.ERRORS.roleExists);
    }

    const newAdmin = await UserModel.create({
      ...req.body,
      email: req.body.email.toLowerCase(),
      role: USER_ROLES.ADMIN,
    });
    const accessToken = newAdmin.generateAccessToken();
    const refreshToken = await newAdmin.generateRefreshJWT();

    const { _id, email, createdAt, updatedAt } = newAdmin.toObject();

    ResponseService.success(res, {
      user: {
        _id,
        email,
        createdAt,
        updatedAt,
      },
      accessToken,
      refreshToken,
    });
  } catch (err: any) {
    ResponseService.error(res, 400, err.message);
  }
};

export default adminRegisterController;
