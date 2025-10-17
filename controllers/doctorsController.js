import { StatusCodes } from "http-status-codes"
import Doctor from "../models/doctorsModel.js"
import supabase from "../config/supabaseClient.js";

export const createDoctor = async (req,res) => {
  const {name, specialization, biography} = req.body
  
  let image_url = null;

  if (req.file) {
    const fileName = `${Date.now()}_${req.file.originalname}`
    const {data, error} = await supabase
      .storage
      .from("doctor-images")
      .upload(fileName, req.file.buffer,{
        contentType:req.file.mimetype,
        upsert:true
      }
      )
    if(error) throw error;

    const {data: publicUrl} = supabase
    .storage
    .from("doctor-images")
    .getPublicUrl(fileName)

    image_url = publicUrl.publicUrl
  }
  const doctor = await Doctor.create({name, specialization, biography, picture:image_url || null })
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
  const {name, specialization, biography} = req.body
  
  let image_url = null;

  if (req.file) {
    const fileName = `${Date.now()}_${req.file.originalname}`
    const {data, error} = await supabase
      .storage
      .from("doctor-images")
      .upload(fileName, req.file.buffer,{
        contentType:req.file.mimetype,
        upsert:true
      }
      )
    if(error) throw error;

    const {data: publicUrl} = supabase
    .storage
    .from("doctor-images")
    .getPublicUrl(fileName)

    image_url = publicUrl.publicUrl
  }
  const updatedDoctor = await Doctor.findByIdAndUpdate({_id: id}, {name, specialization, biography, picture:image_url || null}, {new: true})
  if(!updatedDoctor) throw new Error(`No doctor with id ${id}`)
  res.status(StatusCodes.OK).json({msg:'Doctor updated', data: updatedDoctor})
}

export const removeDoctor = async (req,res) => {
  const {id} = req.params
  await Doctor.findByIdAndDelete({_id: id})
  res.status(StatusCodes.OK).json({_id:id})
}