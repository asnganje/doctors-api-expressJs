import bcrypt from "bcrypt"

export const passwordCompare = async (password1, password2) => {
  const isMatch = await bcrypt.compare(password1, password2)
  return isMatch
}