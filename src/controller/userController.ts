import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserSvc from "../service/userService";
import { Jwt } from "../utils/jwt";
import { User } from "../database/models/user";

const saltRounds = Number(process.env.SALTROUNDS) || 10;

class Users {
  static async register(req: any, res: any) {
    try {
      const { data, message } = await UserSvc.register(req.body);
      if (message) {
        return res.status(400).json({
          status: "fail",
          message,
        });
      }
      return res.status(200).json({
        status: "success",
        data,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }
  static async login(req: any, res: any) {
    try {
      const { email, password } = req.body;
      const user: any = await User.findOne({
        where: { email },
      });

      if (!user) {
        return res
          .status(404)
          .json({ status: "fail", message: "Account does not exist" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ status: "fail", message: "Incorrect Credentials" });
      }

      const token = Jwt.generateToken({
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });

      const decodedToken: any = Jwt.verifyToken(token);
      const { exp } = decodedToken.value;
      const expInMilliseconds = exp * 1000;
      const expirationDate = new Date(expInMilliseconds);
      const formattedExpiration = expirationDate.toLocaleString();
      return res.status(200).json({
        status: "success",
        data: {
          token,
          message: "Login Successful",
        },
      });
    } catch (error: any) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  }
  static async changePassword(req: any, res: any) {
    try {
      const { oldPassword, newPassword } = req.body;
      const { user } = req;
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ status: "fail", message: "Incorrect old password" });
      }
      const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);
      user.password = newHashedPassword;
      await user.save();
      return res
        .status(200)
        .json({ status: "success", message: "Password updated successfully" });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        err: err.message,
      });
    }
  }
  static async getProfile(req: any, res: any) {
    try {
      const { userId } = req.user;
      const user = await UserSvc.getUserById(userId);
      return res.status(200).json({ status: "success", data: user });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        error: err.message,
      });
    }
  }
  static async updateProfile(req: any, res: any) {
    try {
      const { userId } = req.user;
      const { message, value } = await UserSvc.updateUser(req.body, userId);

      if (message) {
        return res.status(400).json({ status: "fail", message });
      }

      return res.status(200).json({
        status: "success",
        data: value,
      });
    } catch (err: any) {
      return res.status(500).json({
        status: "error",
        error: err.message,
      });
    }
  }
}
export default Users;
