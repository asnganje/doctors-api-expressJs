import { Router } from "express"
import { aiChat } from "../controllers/openaiController"

const router = Router()

router.route("/chat", aiChat)
export default router;