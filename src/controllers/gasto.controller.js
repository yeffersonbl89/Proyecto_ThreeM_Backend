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

  export const getGastos = async (req, res) => {
    try {
      // Asegurarse de que req.presupuesto esté definido y tenga la propiedad 'id'
      const presupuestoId = req.presupuesto ? req.presupuesto.id : null;
  
      if (!presupuestoId) {
        return res.status(400).json({ error: "ID del presupuesto no proporcionado en la solicitud" });
      }
  
      // Utiliza presupuesto como el campo en el que se almacena el ID del presupuesto en el modelo Gasto
      const gastos = await Gasto.find({ presupuesto: presupuestoId });
  
      return res.status(200).json(gastos);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };