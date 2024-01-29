import Presupuesto from "../models/presupuesto.model.js";   

export const registroPresupuesto = async (req, res) => {
  const { monto } = req.body;

  try {
    const newPresupuesto = new Presupuesto({
      monto,
      usuario: req.user.id,      
    });

    const presupuestoSaved = await newPresupuesto.save(); //Guarda el presupuesto
    
    return res.status(201).json(presupuestoSaved);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
  }
};

export const getPresupuestos = async (req, res) => {
  try {
    const presupuestos = await Presupuesto.find({usuario: req.user.id});
    console.log(req.user.id);
    return res.status(200).json(presupuestos);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPresupuesto = async (req, res) => {
  const presupuesto = await Presupuesto.findById(req.params.id);
  if (!presupuesto)
    return res.status(404).json({ message: "Presupuesto no encontrado" });
  res.json(presupuesto);
};

export const updatePresupuesto = async (req, res) => {
  const presupuesto = await Presupuesto.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!presupuesto)
    return res.status(404).json({ message: "Presupuesto no encontrado" });
  res.json(presupuesto);
};

export const deletePresupuesto = async (req, res) => {
  const presupuesto = await Presupuesto.findByIdAndDelete(req.params.id);
  if (!presupuesto)
    return res.status(404).json({ message: "Presupuesto no encontrado" });  
  res.json({ message: "Presupuesto eliminado" });
};
//Controlador añadir gastos:
export const agregarGastos = async (req, res) => {
  const { id } = req.params;
  const { nombre, monto, categoria } = req.body;
  try {
    // Busca el presupuesto por su ID
    const presupuesto = await Presupuesto.findById(id);
    // Verifica si el presupuesto existe
    if (!presupuesto) {
        return res.status(404).json({ mensaje: "Presupuesto no encontrado" });
    }
    // Crea un nuevo gasto
    const nuevoGasto = {
        nombre,
        monto,
        categoria
    };
    // Agrega el nuevo gasto al array de gastos del presupuesto
    presupuesto.gastos.push(nuevoGasto);
    // Guarda el presupuesto actualizado en la base de datos
    await presupuesto.save();
    // Devuelve la respuesta exitosa
    return res.status(201).json({ mensaje: "Gasto agregado exitosamente", presupuesto });
} catch (error) {
    // Maneja los errores
    console.error(error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
}
};