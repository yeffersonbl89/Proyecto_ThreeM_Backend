import express from "express";
import morgan from "morgan"; // muestra un registro de solicitudes HTTP
import cookieParcer from "cookie-parser"; // Permite convertir las cookies en archivo json
import authRoutes from "./routes/auth.routes.js";
import presupuestoRoutes from "./routes/presupuesto.routes.js"

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParcer());// Me permite leer el token alojado en cookies

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Error de parseo JSON" });
  }
  next();
});

app.use("/api", authRoutes);
app.use("/api", presupuestoRoutes);

export default app;
