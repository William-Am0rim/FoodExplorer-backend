const AppError = require("../utils/AppError");

class FavoriteDeleteService {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository;
  }

  async execute(requestDishe, user_id) {
    try {
      const favorite = await this.favoriteRepository.delete(
        requestDishe,
        user_id
      );

      return favorite;
    } catch (err) {
      throw new AppError(err);
    }
  }
}

module.exports = FavoriteDeleteService;
