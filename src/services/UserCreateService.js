const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(requestUser) {
    try {
      const checkUserExists = await this.userRepository.findByEmail(
        requestUser.email
      );

      if (checkUserExists) {
        throw new AppError("Este e-mail já está em uso.");
      }
      const password = requestUser.password;
      const hashedPassword = await hash(password, 8);

      if (requestUser.is_admin) {
        throw new AppError("You do not have permission.");
      }
      const userCreated = await this.userRepository.create({
        requestUser,
        password: hashedPassword,
      });

      return userCreated;
    } catch (err) {
      throw new AppError(err);
    }
  }
}

module.exports = UserCreateService;
