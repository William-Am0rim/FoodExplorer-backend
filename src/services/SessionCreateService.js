const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(requestSession) {
    try {
      const user = await this.userRepository.findByEmail(requestSession.email);

      if (!user) {
        throw new AppError("E-mail e/ou senha incorretos", 401);
      }

      const passwordMatched = await compare(
        requestSession.password,
        user.password
      );

      if (!passwordMatched) {
        throw new AppError("E-mail e/ou senha incorretos", 401);
      }

      const { secret, expiresIn } = authConfig.jwt;
      const token = sign({}, secret, {
        subject: String(user.id),
        expiresIn,
      });

      return { user, token };
    } catch (err) {
      throw new AppError(err);
    }
  }
}

module.exports = SessionCreateService;
