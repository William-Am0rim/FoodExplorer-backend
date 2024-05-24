const AppError = require("../utils/AppError");
const UserRepository = require("../repositories/UserRepository");
const UserUpdateService = require("../services/UserUpdateService");
const UserCreateService = require("../services/UserCreateService");
const UserDeleteService = require("../services/UserDeleteService");

class UsersController {
  async create(request, response) {
    try {
      const userRepository = new UserRepository();
      const userCreateService = new UserCreateService(userRepository);

      await userCreateService.execute(request.body);

      return response.status(201).json();
    } catch (err) {
      console.log(err);
      throw new AppError(err);
    }
  }
  async update(request, response) {
    try {
      const { user_id } = request.params;

      const userRepository = new UserRepository();
      const userUpdateService = new UserUpdateService(userRepository);

      await userUpdateService.execute({ user_id }, request.body);

      return response.status(200).json();
    } catch (err) {
      throw new AppError(err);
    }
  }
  async delete(request, response) {
    try {
      const { user_id } = request.params;

      const userRepository = new UserRepository();
      const userDeleteService = new UserDeleteService(userRepository);

      await userDeleteService.execute({ user_id });

      return response.status(200).json();
    } catch (err) {
      console.log(err)
      throw new AppError(err);
    }
  }
}

module.exports = UsersController;
