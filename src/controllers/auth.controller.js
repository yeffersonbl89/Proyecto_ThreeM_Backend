import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js"; 

//Registro de usuario
export const registro = async (req, res) => {
  const { usuario, foto, correo, contrasena } = req.body;

  try {
    // Verificar si el correo ya existe en la base de datos
    const existingUser = await User.findOne({ correo });

    if (existingUser) {
      // Si el correo ya existe
      return res.status(400).json({ message: "El correo ya esta registrado" });
    }

    const passwordHash = await bcrypt.hash(contrasena, 8);

    const newUser = new User({
      
      usuario,
      foto,
      correo,
      contrasena: passwordHash,
    });

    const userSaved = await newUser.save(); //Guarda el usuario
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token); // Envio el token por medio de cookie

    //Informacion usuario creado
    return res.status(201).json(userSaved);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
  }  
};

//Login de usuario
export const login = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const userFound = await User.findOne({ correo }); //Verifica que el usuario exista
    if (!userFound) {
      return res.status(400).json({ message: "Usuario incorrecto" });
    }

    const isMatch = await bcrypt.compare(contrasena, userFound.contrasena); //Verifica la contraseña
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token); // Envio el token por medio de cookie
    return res.status(201).json({ message: "Login Exitoso ¡Bienvenid@!" });
  } catch (error) {
    logger.error(`Error: ${error.message}`);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.status(200).json({ message: "¡Logout exitoso!" });
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound)
    return res.status(400).json({ message: "Usuario no encontrado" });
    return res.status(201).json(userFound);
}; 
