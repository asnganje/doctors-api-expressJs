import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { passwordHash } from "../utils/passwordHash.js";
import { passwordCompare } from "../utils/passwordCompare.js";
import { CustomError } from "../middleware/customErrorHandler.js";
import { createJWT } from "../utils/tokenUtils.js";

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

  const payload = {userId:user._id, role: user.role}
  const token = createJWT(payload)  
  res.cookie('token', token, {
    httpOnly: true,
    secure: false, 
    sameSite:"lax",
    maxAge: 24*60*60*1000,
  })
  res.status(StatusCodes.OK).json({ msg: "login successful"});
};

export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly:true,
    expires: new Date(Date.now()) 
  })
  res.status(StatusCodes.OK).json({ msg: "User logged out successful" });
};
