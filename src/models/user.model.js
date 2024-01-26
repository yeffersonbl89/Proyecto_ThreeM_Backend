import mongoose from "mongoose";
import { DateTime } from 'luxon';

const userSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
    },    
    foto: {
        type: String,
    },
    correo: {
        type: String,
        required: true,
        trim: true, //Quita los espacios en el texto
        unique: true, //Hace que los correos sean unicos
    },
    contrasena: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        default: 'usuario',
    }
}, {
    timestamps: {
        currentTime: () => DateTime.now().setZone('America/Bogota').toJSDate()
    },
    versionKey: false,
});


export default mongoose.model('usuarios', userSchema)