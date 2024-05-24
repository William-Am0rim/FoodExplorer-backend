const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");

class UserUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ user_id }, requestBodyUser) {
    try {
      const {
        name,
        email,
        password,
        is_admin = false,
        old_password,
      } = requestBodyUser;
      const user = await this.userRepository.findById(user_id);
      if (!user) {
        throw new AppError("User does not exist.");
      }

      if (email) {
        const validateEmailExistence = await this.userRepository.findByEmail(
          email
        );

        if (validateEmailExistence) {
          throw new AppError("Email already exists.");
        }
      }

      if (!user.is_admin && is_admin) {
        throw new AppError("You do not have permission.");
      }

      if (password && password !== undefined) {
        const validatePassword = await compare(old_password, user.password);

        if (!validatePassword) {
          throw new AppError("Old password is incorrect.");
        }
      }
      const hashedPassword = await hash(password, 8);
      const dataUser = password
        ? {
            ...requestBodyUser,
            password: hashedPassword,
            old_password: undefined,
          }
        : { ...requestBodyUser };

      const userUpdate = await this.userRepository.update(user_id, dataUser);

      return userUpdate;
    } catch (err) {
      throw new AppError(err);
    }
  }
}

module.exports = UserUpdateService;
