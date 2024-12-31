import { User } from "../database/models/user";
import { Jwt } from "../utils/jwt";

async function isAuthenticated(req: any, res: any, next: any) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(401)
        .json({ status: "fail", message: "Missing Authentication Token" });
    }
    const token = authorization.split(" ")[1];
    try {
      const decodedToken: any = Jwt.verifyToken(token);
      if (decodedToken.expired !== undefined) {
        const email = decodedToken.expired;
        User.findOne({
          where: { email },
        }).then(async (user) => {
          if (user) {
            await user.update({ isLoggedIn: false });
          }
        });
        return res.status(401).json({
          status: "fail",
          message: "Unauthorized Access",
        });
      }
      const { email } = decodedToken.value;
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        return res
          .status(401)
          .json({ status: "fail", message: "Unauthorized Access" });
      }
      req.user = user;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        status: "fail",
        message: "Authentication Error",
      });
    }
  } catch (error: any) {
    return res.status(500).json({ status: "error", error: error.message });
  }
}

export default isAuthenticated;
