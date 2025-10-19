import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET

export const createAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_SECRET, {expiresIn:"15m"})
}

export const createRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_SECRET, {expiresIn:"7d"})
}

export const verifyAccessToken = (token) => jwt.verify(token, ACCESS_SECRET)
export const verifyRefreshToken = (token) => jwt.verify(token, REFRESH_SECRET)
