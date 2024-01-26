import Presupuesto from "../models/presupuesto.model.js";

export const registroPresupuesto = async (req, res) => {
  const { monto, usuario } = req.body;

  try {
    const newPresupuesto = new Presupuesto({
      monto,
      fecha: Date.now(),
      usuario: req.user.id,      
    });

    const savedPresupuesto = await newPresupuesto.save(); //Guarda el presupuesto

    return res.status(201).json(savedPresupuesto);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
  }
};

export const getPresupuestos = async (req, res) => {
  try {
    const presupuestos = await Presupuesto.find({usuario: req.user.id});

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
