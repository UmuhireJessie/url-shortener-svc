import { User } from "../database/models/user";

export const checkUserExist = async (req: any, res: any, next: any) => {
  try {
    const { email } = req.body;
    if (email) {
      const existingUser: any = await User.findOne({
        where: { email },
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ status: "fail", message: "Email already exists" });
      }
    }
    next();
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      error: error.message,
    });
  }
};
