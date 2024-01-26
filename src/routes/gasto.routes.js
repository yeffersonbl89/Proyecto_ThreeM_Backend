import { Router } from "express";
import { registroGasto, getGastos } from "../controllers/gasto.controller.js";
// import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/crear/gasto", registroGasto);
router.get("/gastos", getGastos);

export default router;
