const UserRepository = require("../repositories/UserRepository");
const SessionCreateService = require("../services/SessionCreateService");
const AppError = require("../utils/AppError");

class SessionsController {
  async create(request, response) {
    try {
      const userRepository = new UserRepository();
      const sessionCreateService = new SessionCreateService(userRepository);

      const createSession = await sessionCreateService.execute(request.body);

      return response.status(201).json(createSession);
    } catch (err) {
      throw new AppError(err);
    }
  }
}

module.exports = SessionsController;
