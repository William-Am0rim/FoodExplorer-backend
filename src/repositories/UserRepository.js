const knex = require("../database/knex");
const AppError = require("../utils/AppError");
class UserRepository {
  async findByEmail(email) {
    try {
      const user = await knex("users").where({ email }).first();

      return user;
    } catch (err) {
      throw new AppError(err);
    }
  }

  async findById(user_id) {
    try {
      const user = await knex("users").where({ id: user_id }).first();

      return user;
    } catch (err) {
      throw new AppError(err);
    }
  }

  // CRUD:
  async create({ requestUser, password }) {
    try {
      const createUser = await knex("users").insert({
        ...requestUser,
        password,
      });

      return { id: createUser };
    } catch (err) {
      throw new AppError(err);
    }
  }

  async update(user_id, dataUser) {
    try {
      const updateUser = await knex("users")
        .where({ id: user_id })
        .update(dataUser);

      return { id: updateUser };
    } catch (err) {
      throw new AppError(err);
    }
  }

  async delete(user_id) {
    try {
      const deleteUser = await knex("users").where({ id: user_id }).delete();

      return { id: deleteUser };
    } catch (err) {
      throw new AppError(err);
    }
  }
}

module.exports = UserRepository;
