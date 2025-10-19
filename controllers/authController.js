import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { passwordHash } from "../utils/passwordHash.js";
import { passwordCompare } from "../utils/passwordCompare.js";
import { CustomError } from "../middleware/customErrorHandler.js";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../utils/jwtUtils.js";

export const register = async (req, res) => {
  const isFirst = (await User.countDocuments()) === 0;
  req.body.role = isFirst ? "admin" : "user";
  
  req.body.password = await passwordHash(req.body.password);
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "registration successful" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError("User not found", StatusCodes.NOT_FOUND);
  }
  const isMatch = await passwordCompare(password, user.password);
  if (!isMatch) {
    throw new CustomError("Invalid credentials", StatusCodes.UNAUTHORIZED);
  }
  
  const accessToken = createAccessToken({id: user._id})
  const refreshToken = createRefreshToken({id: user._id})
  user.refreshToken = refreshToken
  await user.save()
  
  res.status(StatusCodes.OK).json({ accessToken, refreshToken});
};

export const logout = async (req, res) => {  
  const {refreshToken} = req.query
  if (!refreshToken) {
    throw new CustomError("Invalid token")
  }
  const user = await User.findOne({refreshToken})
  if (user) {
    user.refreshToken = null;
    await user.save()
  }
  res.status(StatusCodes.OK).json({ msg: "User logged out successful" });
};
