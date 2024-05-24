const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class FavoriteRepository {
  async create(dish_id, user_id) {
    try {
      const favorite = await knex("favorites").insert({
        user_id,
        dish_id,
      });

      return favorite;
    } catch (err) {
      console.log(err);
      throw new AppError(err);
    }
  }

  async index(user_id) {
    try {
      const indexFavorites = await knex("favorites")
        .select("dishes.*", "favorites.dish_id")
        .innerJoin("dishes", "dishes.id", "favorites.dish_id")
        .where({ user_id });

      return indexFavorites;
    } catch (err) {
      throw new AppError(err);
    }
  }
  async delete(requestDishe, user_id) {
    try {
      const { dish_id } = requestDishe;
      const deleteFavorite = await knex("favorites")
        .where({ user_id, dish_id })
        .delete();

      return deleteFavorite;
    } catch (err) {
      throw new AppError(err);
    }
  }
}

module.exports = FavoriteRepository;
