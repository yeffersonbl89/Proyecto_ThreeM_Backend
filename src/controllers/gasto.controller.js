import Gasto from "../models/gasto.model.js";

export const registroGasto = async (req, res) => {
    const { presupuesto, nombre, monto, categoria } = req.body;
  
    try {
      const newGasto = new Gasto({
        presupuesto,
        nombre,
        monto,
        categoria,
      });
  
      const savedGasto = await newGasto.save(); //Guarda el presupuesto
  
      return res.status(201).json(savedGasto);
    } catch (error) {
      console.log(error);
    }
  };