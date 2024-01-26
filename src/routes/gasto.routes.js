import { Router } from "express";
import { registroGasto  } from "../controllers/gasto.controller.js";
// import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/crear/gasto", registroGasto);

export default router;