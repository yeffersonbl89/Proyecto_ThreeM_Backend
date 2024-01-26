import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import presupuestoRoutes from "./routes/presupuesto.routes.js";
import gastoRoutes from "./routes/gasto.routes.js";


const app = express();


app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Error de parseo JSON" });
  }
  next();
});

app.use("/api", authRoutes);
app.use("/api", presupuestoRoutes);
app.use("/api", gastoRoutes);

export default app;
