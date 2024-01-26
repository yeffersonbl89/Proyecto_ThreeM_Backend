import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      {
        expiresIn: "20m",
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
}
