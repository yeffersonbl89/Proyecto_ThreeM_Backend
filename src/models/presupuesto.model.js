import mongoose from "mongoose";

const presupuestoSchema = new mongoose.Schema ({
    monto: {
        type: Number,
        required: true
    },
    gastos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gastos'
    }],
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
},  { versionKey: false, timestamps: true });

export default mongoose.model('presupuestos', presupuestoSchema) 