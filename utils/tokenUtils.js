import jwt from "jsonwebtoken"

export const createJWT = (payload) => {
  const secret = process.env.JWT_SECRET
  const exp = process.env.JWT_EXPIRY
  const token = jwt.sign(payload, secret, {expiresIn: exp})
  return token
}