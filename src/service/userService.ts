import bcrypt from "bcrypt";
import { User } from "../database/models/user";
import { Op } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const saltRounds = Number(process.env.SALTROUNDS);

class UserSvc {
  static async register(data: any) {
    data.password = await bcrypt.hash(data.password, saltRounds);
    const { firstName, lastName, email, password } = data;

    if (email) {
      const existingUser = await User.findOne({
        where: { email },
      });

      if (existingUser) {
        return { message: "Email already exists" };
      }
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    return { data: user };
  }

  static async getUserById(userId: any) {
    const user = await User.findOne({
      where: { userId: userId },
    });
    if (user) {
      return user;
    }
  }

  static async updateUser(fields: any, userId: any) {
    const user = await User.findOne({ where: { userId: userId } });
    const { firstName, lastName } = fields;
    if (user) {
      await user.update({ firstName, lastName});
      return { value: user };
    } else {
      return { message: "User not found" };
    }
  }
}
export default UserSvc;
