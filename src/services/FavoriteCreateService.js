const AppError = require("../utils/AppError");

class FavoriteCreateService {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository;
  }

  async execute(requestBody, user_id) {
    try {
      const { dish_id } = requestBody;

      const createFavorite = await this.favoriteRepository.create(
        dish_id,
        user_id
      );

      return createFavorite;
    } catch (err) {
      console.log(err);
      throw new AppError(err);
    }
  }
}

module.exports = FavoriteCreateService;
