import { knexConnection as knex } from "../database/knex/index.js";
import { AppError } from "../utils/AppError.js";
import { compare } from "bcrypt";
import authConfig from "../configs/auth.js";

import pkg from "jsonwebtoken";

const { sign } = pkg;

export class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;
    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("Email ou senha incorreta", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Email ou senha incorreta", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return response.json({ user, token });
  }
}
