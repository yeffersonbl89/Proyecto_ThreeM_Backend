import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/threeM')
        console.log('¡Conexion a DB Exitoso!');
    } catch (error) {
        console.log(error);
    }
};