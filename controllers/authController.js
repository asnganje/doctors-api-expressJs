import { StatusCodes } from "http-status-codes"
import User from "../models/UserModel.js"
import { passwordHash} from "../utils/passwordHash.js"

export const register = async (req,res) => {
  const isFirst = await User.countDocuments() === 0
  req.body.role = isFirst?"admin":"user"
  req.body.password = await passwordHash(req.body.password)
  const user = await User.create(req.body)
  res.status(StatusCodes.CREATED).json({msg:'registration successful'})
}

export const login = (req,res) => {
  res.status(StatusCodes.OK).json({msg:'login successful'})
}

export const logout = (req,res) => {
  res.status(StatusCodes.OK).json({msg:'Logout successful'})
}