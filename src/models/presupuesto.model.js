import mongoose from "mongoose";

const presupuestoSchema = new mongoose.Schema ({
    monto: {
        type: Number,
        required: true
    },
    gastos: [{
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
            ref: 'categorias',
            required: true
        }
    }],
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
},  { versionKey: false, timestamps: true });

export default mongoose.model('presupuestos', presupuestoSchema) 