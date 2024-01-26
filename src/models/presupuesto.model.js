import mongoose from "mongoose";
import { DateTime } from 'luxon';

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
    fecha: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: {
        currentTime: () => DateTime.now().setZone('America/Bogota').toJSDate()
    },
    versionKey: false,
});

export default mongoose.model('presupuestos', presupuestoSchema) 