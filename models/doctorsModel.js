import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: {
    type:String,
    required: [true, 'Please provide name']
  },
  specialization: {
    type:String,
    required: [true, 'Please provide specialization'],
    minlength:[8, 'Specialization must be at least 8 characters long']
  },
  biography: {
    type: String,
    required: [true, 'Please provide biography']
  },
  picture: {
    type:String,
    // required: [true, 'Please provide picture'],
    default:"test"
  },
},
{ timestamps: true }
)

export default mongoose.model('Doctor', DoctorSchema)