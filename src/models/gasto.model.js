import mongoose from "mongoose";

const gastoSchema = new mongoose.Schema ({
    fecha: {
        type: Date,
        required: true,
    },
    presupuesto: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'presupuestos'
    }],
    nombre: {
        type: String,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    categoria:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categoria',
        required: true
    }
})

export default mongoose.model('gastos', gastoSchema)