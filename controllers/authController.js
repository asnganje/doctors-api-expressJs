import { StatusCodes } from "http-status-codes"

export const register = (req,res) => {
  res.status(StatusCodes.CREATED).json({msg:'registration successful'})
}

export const login = (req,res) => {
  res.status(StatusCodes.OK).json({msg:'login successful'})
}

export const logout = (req,res) => {
  res.status(StatusCodes.OK).json({msg:'Logout successful'})
}