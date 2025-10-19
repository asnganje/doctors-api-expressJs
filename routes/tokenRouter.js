import { Router } from "express";
import { tokenHandler } from "../controllers/tokenController.js";

const router = Router();

router.post('/', tokenHandler)

export default router;