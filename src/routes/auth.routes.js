import { Router } from "express";
import {
  login,
  logout,
  registro,
  profile,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middlewares.js";
import { registroSchema, loginSchema } from "../schemas/auth.schemas.js";

const router = Router();

router.post("/registro", validateSchema(registroSchema), registro);

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/profile", authRequired, profile);

export default router;
