import { hash, compare } from "bcrypt";
import { AppError } from "../utils/AppError.js";
import { knexConnection as knex } from "../database/knex/index.js";

export class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      throw new AppError("Por favor preencha todos os campos.");
    }

    const checkUserExists = await knex("users").where({ email }).first();

    if (checkUserExists) {
      throw new AppError("Este email já foi usado");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("User not found");
    }

    const userUpdatedEmail = await knex("users").where({ email }).first();
    if (userUpdatedEmail && userUpdatedEmail.id !== user.id) {
      throw new AppError("Email already used");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError("Inform the old password");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Old password is not right");
      }

      user.password = await hash(password, 8);
    } else if (password && !old_password) {
    } else {
      user.password = user.password;
    }

    await knex("users")
      .update({
        name: user.name,
        email: user.email,
        password: user.password,
        updated_at: knex.fn.now(),
      })
      .where({ id: user_id });

    return response.json();
  }
}
