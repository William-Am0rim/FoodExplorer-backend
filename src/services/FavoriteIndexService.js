const AppError = require("../utils/AppError");

class FavoriteIndexService {
  constructor(favoriteRepository) {
    this.favoriteRepository = favoriteRepository;
  }

  async execute(user_id) {
    try {
      const indexFavorite = await this.favoriteRepository.index(user_id);

      return indexFavorite;
    } catch (err) {
      throw new AppError(err);
    }
  }
}

module.exports = FavoriteIndexService;
