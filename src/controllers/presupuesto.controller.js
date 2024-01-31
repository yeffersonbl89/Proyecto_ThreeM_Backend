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
//Controladores para gastos:
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
    // Verifica si el monto del nuevo gasto supera el presupuesto
    if (monto > presupuesto.monto) {
      return res.status(400).json({ mensaje: "El monto del gasto supera el presupuesto" });     
    }
    // Crea un nuevo gasto
    const nuevoGasto = {
        nombre,
        monto,
        categoria
    };
    // Agrega el nuevo gasto al array de gastos del presupuesto
    presupuesto.gastos.push(nuevoGasto);
    presupuesto.totalGastos = presupuesto.gastos.reduce((total, gasto) => total + gasto.monto, 0);
     // Verifica si el totalGastos supera el presupuesto.monto
     if (presupuesto.totalGastos > presupuesto.monto) {
      // Revierte la operación y devuelve un mensaje de error
      presupuesto.gastos.pop(); // Elimina el último gasto agregado
      presupuesto.totalGastos = presupuesto.gastos.reduce((total, gasto) => total + gasto.monto, 0);
      await presupuesto.save(); // Guarda la versión actualizada sin el último gasto
      return res.status(400).json({ mensaje: "El monto del gasto supera el presupuesto" });
    }
    // Guarda el presupuesto actualizado en la base de datos
    await presupuesto.save();
    // Devuelve la respuesta exitosa
    console.log(presupuesto.monto);
    return res.status(201).json({ mensaje: "Gasto agregado exitosamente", presupuesto });
} catch (error) {
    // Maneja los errores
    console.error(error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
}
};

export const getGastosPresupuesto = async (req, res) => {
  try {
    // Obtiene el ID del presupuesto desde la URL
    const { id } = req.params;

    // Busca el presupuesto por su ID
    const presupuesto = await Presupuesto.findById(id);

    // Verifica si el presupuesto existe
    if (!presupuesto) {
      return res.status(404).json({ mensaje: "Presupuesto no encontrado" });
    }

    // Devuelve los gastos del presupuesto
    return res.status(200).json({ gastos: presupuesto.gastos });
  } catch (error) {
    // Maneja los errores
    console.error(error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
}

export const actualizarGasto = async (req, res) => {
  const { id, gastoId } = req.params;
  const { nombre, monto, categoria } = req.body;

  try {
    // Busca el presupuesto por su ID
    const presupuesto = await Presupuesto.findById(id);

    // Verifica si el presupuesto existe
    if (!presupuesto) {
      return res.status(404).json({ mensaje: "Presupuesto no encontrado" });
    }

    // Busca el gasto en el array de gastos del presupuesto
    const gastoExistente = presupuesto.gastos.find((gasto) => gasto._id.toString() === gastoId);

    // Verifica si el gasto existe
    if (!gastoExistente) {
      return res.status(404).json({ mensaje: "Gasto no encontrado" });
    }

    // Resta el monto del gasto existente antes de actualizarlo
    presupuesto.totalGastos -= gastoExistente.monto;

    // Actualiza el gasto existente
    gastoExistente.nombre = nombre;
    gastoExistente.monto = monto;
    gastoExistente.categoria = categoria;

    // Suma el nuevo monto del gasto actualizado al totalGastos
    presupuesto.totalGastos += monto;

    // Verifica si el totalGastos supera el presupuesto.monto
    if (presupuesto.totalGastos > presupuesto.monto) {
      // Revierte la operación y devuelve un mensaje de error
      gastoExistente.monto = gastoExistente.monto; // Restaura el monto anterior
      presupuesto.totalGastos -= monto; // Resta el nuevo monto del gasto
      await presupuesto.save(); // Guarda la versión actualizada sin el gasto actualizado
      return res.status(400).json({ mensaje: "El monto del gasto actualizado supera el presupuesto" });
    }

    // Guarda el presupuesto actualizado en la base de datos
    await presupuesto.save();

    // Devuelve la respuesta exitosa
    return res.status(200).json({ mensaje: "Gasto actualizado exitosamente", presupuesto });
  } catch (error) {
    // Maneja los errores
    console.error(error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
