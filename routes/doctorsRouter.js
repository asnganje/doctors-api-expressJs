import { Router } from "express"
import { createDoctor, getAllDoctors, getDoctor, removeDoctor, updateDoctor } from "../controllers/doctorsController.js"
import upload from "../middleware/uploadMiddleware.js"

const router = Router()

router.route('/').get(getAllDoctors).post(upload.single("image"), createDoctor)
router.route('/:id').get(getDoctor).patch(upload.single("image"), updateDoctor).delete(removeDoctor)

export default router;