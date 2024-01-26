import { z } from "zod";

export const registroSchema = z.object({  
  correo: z
    .string({
      required_error: "El correo es requerido",
    })
    .email({
      message: "El correo es invalido",
    }),
  contrasena: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .refine((contrasena) => contrasena.length >= 6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    })
    .refine((contrasena) => /[a-zA-Z]/.test(contrasena), {
      message: "La contraseña debe contener al menos una letra",
    })
    .refine((contrasena) => /\d/.test(contrasena), {
      message: "La contraseña debe contener al menos un número",
    })
    .refine((contrasena) => /[*]/.test(contrasena), {
      message:
        "La contraseña debe contener al menos un asterisco (*) u otro carácter especial",
    }),
});

export const loginSchema = z.object({
  correo: z
    .string({
      required_error: "El correo es requerido",
    })
    .email({
      message: "El correo es invalido",
    }),
  contrasena: z.string({
    required_error: "La contrseña es requerida",
  }),
});
