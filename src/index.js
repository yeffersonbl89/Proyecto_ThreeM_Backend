import app from './app.js';
import { connectDB } from "./db.js";
import dotenv from "dotenv";
import path from "path";
dotenv.config(); // Carga las variables de entorno desde el archivo .env
connectDB();

const port = process.env.PORT ; 
process.env.TZ = 'America/Bogota';
const server = app.listen(port, () => {
  console.log('Servidor iniciado en el puerto', port, '✨');
  console.log('Hora actual en Bogotá:', new Date().toLocaleString('en-US', { timeZone: 'America/Bogota' }));
});

// También puedes agregar un manejador para cerrar el servidor adecuadamente
process.on('SIGINT', () => {
  console.log('Servidor detenido');
  server.close(() => {
    process.exit(0);
  });
});
