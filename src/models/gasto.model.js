import mongoose from "mongoose";
import { DateTime } from 'luxon';

const gastoSchema = new mongoose.Schema ({    
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
        ref: 'categorias',
        required: true
    }
},{
    timestamps: {
        currentTime: () => DateTime.now().setZone('America/Bogota').toJSDate()
    },
    versionKey: false,
});
export default mongoose.model('gastos', gastoSchema)  