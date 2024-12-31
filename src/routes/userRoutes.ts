import express from "express";
import Users from "../controller/userController";
import signupValidate from "../middleware/signUpValidate";
import { checkUserExist } from "../middleware/checkUser";
import loginValidate from "../middleware/loginValidate";
import changePasswordValidate from "../middleware/changePassword";
import isAuthenticated from "../middleware/verifyToken";
import profileValidate from "../middleware/profileValidate";

const router = express.Router();
router.post("/register", signupValidate, checkUserExist, Users.register);
router.post("/login", loginValidate, Users.login);
router.get("/profile", isAuthenticated, Users.getProfile);
router.patch(
  "/change-password",
  isAuthenticated,
  changePasswordValidate,
  Users.changePassword
);
router.patch(
  "/profiles",
  isAuthenticated,
  profileValidate,
  Users.updateProfile
);

export default router;
