import { Router } from "express"
import { aiChat } from "../controllers/openaiController.js"

const router = Router()

router.route("/chat").post(aiChat)
export default router;