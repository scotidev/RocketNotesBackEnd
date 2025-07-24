import { AppError } from "../utils/AppError.js";
import authConfig from "../configs/auth.js";
import pkg from "jsonwebtoken";

const { verify } = pkg;

export function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token inválido", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
    };

    return next();
  } catch (error) {
    throw new AppError("JWT token inválido", 401);
  }
}
