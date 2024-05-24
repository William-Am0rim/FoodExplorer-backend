const AppError = require("../utils/AppError");
const FavoriteRepository = require("../repositories/FavoriteRepository");
const FavoriteCreateService = require("../services/FavoriteCreateService");
const FavoriteIndexService = require("../services/FavoriteIndexService");
const FavoriteDeleteService = require("../services/FavoriteDeleteService");

class FavoritesController {
  async create(request, response) {
    try {
      const favoriteRepository = new FavoriteRepository();
      const favoriteCreateService = new FavoriteCreateService(
        favoriteRepository
      );

      const favorite = favoriteCreateService.execute(
        request.body,
        request.user.id
      );

      return response.json(favorite);
    } catch (err) {
      throw new AppError(err);
    }
  }

  async index(request, response) {
    try {
      const favoriteRepository = new FavoriteRepository();
      const favoriteIndexService = new FavoriteIndexService(favoriteRepository);

      const favorites = await favoriteIndexService.execute(request.user.id);

      return response.json(favorites);
    } catch (err) {
      console.log(err);
      throw new AppError(err);
    }
  }

  async delete(request, response) {
    try {
      const favoriteRepository = new FavoriteRepository();
      const favoriteDeleteService = new FavoriteDeleteService(
        favoriteRepository
      );

      const deleteFavorite = await favoriteDeleteService.execute(
        request.params,
        request.user.id
      );

      return response.json(deleteFavorite);
    } catch (err) {
      throw new AppError(err);
    }
  }
}

module.exports = FavoritesController;
