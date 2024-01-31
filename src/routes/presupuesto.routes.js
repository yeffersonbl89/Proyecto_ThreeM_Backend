import { Router } from "express";
import {
  registroPresupuesto,
  getPresupuestos,
  getPresupuesto,
  updatePresupuesto,
  deletePresupuesto,
  agregarGastos,
  actualizarGasto,  
  getGastosPresupuesto,
} from "../controllers/presupuesto.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/crear/presupuesto", authRequired, registroPresupuesto);
router.get("/presupuestos", authRequired, getPresupuestos);
router.get("/presupuesto/:id", authRequired, getPresupuesto);
router.delete("/presupuesto/:id", authRequired, deletePresupuesto);
router.put("/presupuesto/:id", authRequired, updatePresupuesto);

router.post("/presupuesto/:id/gastos", authRequired, agregarGastos);
router.get("/presupuesto/gastos/:id", authRequired, getGastosPresupuesto);
router.put("/presupueso/actualizar/gasto/:id/:gastoId", authRequired, actualizarGasto);

export default router;
