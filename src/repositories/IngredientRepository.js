const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class IngredientRepository {
  async findByid(requestIngredient) {
    try {
      const { id } = requestIngredient;
      const ingredients = await knex("ingredients")
        .where({ dish_id: id })
        .orderBy("name");

      return ingredients;
    } catch (err) {
      throw new AppError(err);
    }
  }

  async ingredientAll() {
    try {
      const dishesIngredients = await knex("ingredients");

      return dishesIngredients;
    } catch (err) {
      throw new AppError(err);
    }
  }
  async createIngredient(ingredientsInsert) {
    try {
      const ingredient = await knex("ingredients").insert(ingredientsInsert);

      return ingredient;
    } catch (err) {
      throw new AppError(err);
    }
  }
  async deleteIngredient(id) {
    try {
      await knex("ingredients").where({ dish_id: id }).delete();
    } catch (err) {
      throw new AppError(err);
    }
  }
}

module.exports = IngredientRepository;
