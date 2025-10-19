import { StatusCodes } from "http-status-codes";
import { CustomError } from "../middleware/customErrorHandler.js";
import User from "../models/UserModel.js";
import { createAccessToken, verifyRefreshToken } from "../utils/jwtUtils.js";

export const tokenHandler = async (req,res) => {
  const {refreshToken} = req.body;
  if (!refreshToken) {
    throw new CustomError("Invalid or no refresh token")
  }
  const payload = verifyRefreshToken(refreshToken)
  const user = await User.findById(payload.id)

  if (!user || user.refreshToken !== refreshToken) {
    throw new CustomError("Invalid token!")
  }

  const newAccessToken = createAccessToken({id:user._id})
  res.status(StatusCodes.OK).json({accessToken: newAccessToken})
}