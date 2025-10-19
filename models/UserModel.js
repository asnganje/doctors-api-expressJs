import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    minlength: [8, 'Name must be at least 10 characters long'],
    required:[true, 'Fullname is required']
  },
  email: {
    type: String,
    required:[true, 'Email is required']
  },
  password: {
    type: String,
    required:[true, 'Password is required']
  },
  role: {
    type:String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  refreshToken: {
    type:String
  }
})

export default mongoose.model('User', UserSchema)