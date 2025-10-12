import { StatusCodes } from "http-status-codes"

export const createDoctor = (req,res) => {
  res.status(StatusCodes.CREATED).json({msg:'Doctor created'})
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