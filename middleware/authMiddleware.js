import { StatusCodes } from "http-status-codes"
import { CustomError } from "./customErrorHandler.js"
import { verifyToken } from "../utils/tokenUtils.js"

export const authenticateUser = (req,res,next) => {
  const {token} = req.cookies
  if (!token) {
    throw new CustomError("Unauthenticated User detected", StatusCodes.UNAUTHORIZED)
  }

  try {
    const {userId, role} = verifyToken(token)
    req.user = {userId, role}
    next()
  } catch (error) {
    throw new CustomError(`Invalid token ${error}`, StatusCodes.UNAUTHORIZED)
  }
  
}