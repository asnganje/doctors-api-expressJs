import { StatusCodes } from "http-status-codes"
import Doctor from "../models/doctorsModel.js"

export const createDoctor = async (req,res) => {

  const doctor = await Doctor.create(req.body)
  if (!doctor) {
    throw new Error('Could not create a doctor')
  }
  res.status(StatusCodes.CREATED).json({msg:'Doctor created', data: doctor})
}

export const getDoctor = (req,res) => {
  res.status(StatusCodes.CREATED).json({msg:'Doctor found'})
}

export const getAllDoctors = (req,res) => {
  res.status(StatusCodes.CREATED).json({msg:'All Doctors'})
}

export const updateDoctor = (req,res) => {
  res.status(StatusCodes.CREATED).json({msg:'Doctor updated'})
}

export const removeDoctor = (req,res) => {
  res.status(StatusCodes.CREATED).json({msg:'Doctor deleted'})
}