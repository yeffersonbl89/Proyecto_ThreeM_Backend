import app from './app.js';
import { connectDB } from "./db.js";

connectDB();
app.listen(3200)
console.log('Servidor iniciado en el puerto', 3200 , "✨");