import { Router } from "express"
import { createDoctor, getAllDoctors, getDoctor, removeDoctor, updateDoctor } from "../controllers/doctorsController.js"

const router = Router()

router.route('/').get(getAllDoctors).post(createDoctor)
router.route('/:id').get(getDoctor).patch(updateDoctor).delete(removeDoctor)

export default router;