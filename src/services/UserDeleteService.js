const AppError = require("../utils/AppError");

class UserDeleteService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute({ user_id }) {
    try {
      const validateUserExitence = this.userRepository.findById(user_id);

      if (!validateUserExitence) {
        throw new AppError("User is not existend");
      }

      const deleteUser = await this.userRepository.delete(user_id);

      return deleteUser;
    } catch (err) {
      throw new AppError(err);
    }
  }
}

module.exports = UserDeleteService;
