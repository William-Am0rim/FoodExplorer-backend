const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class DisheRepository {
  async dishById(requestDishe) {
    try {
      const { id } = requestDishe;
      const dish = await knex("dishes").where({ id }).first();

      return dish;
    } catch (err) {
      throw new AppError(err);
    }
  }

  async searchDisheTrue(keywords) {
    try {
      const dishes = await knex("dishes")
        .select([
          "dishes.id",
          "dishes.name",
          "dishes.description",
          "dishes.category",
          "dishes.price",
          "dishes.image",
        ])
        .leftJoin("ingredients", "dishes.id", "ingredients.dish_id")
        .where((builder) => {
          builder.where((builder2) => {
            keywords.forEach((keyword) => {
              builder2.orWhere("dishes.name", "like", keyword);
              builder2.orWhere("dishes.description", "like", keyword);
            });
          });
          keywords.forEach((keyword) => {
            builder.orWhere("ingredients.name", "like", keyword);
          });
        })
        .groupBy("dishes.id")
        .orderBy("dishes.name");

      return dishes;
    } catch (err) {
      throw new AppError(err);
    }
  }

  async searchDisheFalse() {
    try {
      const dishes = await knex("dishes")
        .select([
          "dishes.id",
          "dishes.name",
          "dishes.description",
          "dishes.category",
          "dishes.price",
          "dishes.image",
        ])
        .orderBy("dishes.name");

      return dishes;
    } catch (err) {
      throw new AppError(err);
    }
  }

  async createDish(requestDishe, filename, user_id) {
    try {
      const { name, description, category, price } = requestDishe;
      const [dish_id] = await knex("dishes").insert({
        name,
        description,
        category,
        price,
        image: filename,
        created_by: user_id,
        updated_by: user_id,
      });

      return dish_id;
    } catch (err) {
      throw new AppError(err);
    }
  }

  async deleteDish(requestDishe) {
    try {
      const { Dish_id } = requestDishe
      await knex("dishes").where({ id: Dish_id }).delete();
    } catch (err) {
      throw new AppError(err);
    }
    return { id: requestDishe };
  }
}

module.exports = DisheRepository;
