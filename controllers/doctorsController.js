import { StatusCodes } from "http-status-codes"
import Doctor from "../models/doctorsModel.js"

export const createDoctor = async (req,res) => {

  const doctor = await Doctor.create(req.body)
  if (!doctor) {
    throw new Error('Could not create a doctor')
  }
  res.status(StatusCodes.CREATED).json({msg:'Doctor created', data: doctor})
}

export const getDoctor = async (req,res) => {
  const { id } = req.params
  const doctor = await Doctor.findOne({_id:id})
  if(!doctor) throw new Error(`No doctor with id ${id}`)
  res.status(StatusCodes.OK).json({msg:'Doctor found', data: doctor})
}

export const getAllDoctors = async (req,res) => { 
  const doctors = await Doctor.find({})
  res.status(StatusCodes.OK).json({msg:'All Doctors', nbHits: doctors.length, data: doctors})
}

export const updateDoctor = async (req,res) => {
  const {id} = req.params
  const updatedDoctor = await Doctor.findByIdAndUpdate({_id: id}, req.body, {new: true})
  if(!updatedDoctor) throw new Error(`No doctor with id ${id}`)
  res.status(StatusCodes.OK).json({msg:'Doctor updated', data: updatedDoctor})
}

export const removeDoctor = async (req,res) => {
  const {id} = req.params
  await Doctor.findByIdAndDelete({_id: id})
  res.status(StatusCodes.OK).json({msg:'Doctor deleted'})
}