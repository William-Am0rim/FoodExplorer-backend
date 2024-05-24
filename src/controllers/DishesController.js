const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DisheCreateService = require("../services/DisheCreateService");
const DisheRepository = require("../repositories/DisheRepository");
const IngredientRepository = require("../repositories/IngredientRepository");
const DisheUpdateService = require("../services/DisheUpdateService");
const DisheIndexService = require("../services/DisheIndexService");

class DishesController {
  async create(request, response) {
    try {
      const disheRepository = new DisheRepository();
      const ingredientRepository = new IngredientRepository();
      const disheCreateService = new DisheCreateService(
        disheRepository,
        ingredientRepository
      );

      const createSession = await disheCreateService.execute(
        request.body,
        request.file.filename,
        request.user.id
      );

      return response.json(createSession);
    } catch (err) {
      throw new AppError(err);
    }
  }

  async show(request, response) {
    try {
      const disheRepository = new DisheRepository();
      const ingredientRepository = new IngredientRepository();

      const dish = await disheRepository.dishById(request.params);
      const ingredients = await ingredientRepository.findByid(request.params);

      return response.json({
        ...dish,
        ingredients,
      });
    } catch (err) {
      console.log(err);
      throw new AppError(err);
    }
  }

  async delete(request, response) {
    try {
      const disheRepository = new DisheRepository();
      await disheRepository.deleteDish(request.params);

      return response.json();
    } catch (err) {
      throw new AppError(err);
    }
  }

  async update(request, response) {
    try {
      const disheRepository = new DisheRepository();
      const ingredientRepository = new IngredientRepository();

      const disheUpdateService = new DisheUpdateService(
        disheRepository,
        ingredientRepository
      );

      await disheUpdateService.execute(
        request.body,
        request.params,
        request.file?.filename,
        request.user.id,
        knex.fn.now()
      );

      return response.json();
    } catch (err) {
      throw new AppError(err);
    }
  }

  async index(request, response) {
    try {
      const disheRepository = new DisheRepository();
      const ingredientRepository = new IngredientRepository();

      const disheIndexService = new DisheIndexService(
        disheRepository,
        ingredientRepository
      );

      const dishesWithIngredients = await disheIndexService.execute(
        request.query
      );

      return response.json(dishesWithIngredients);
    } catch (err) {
      throw new AppError(err);
    }
  }
}

module.exports = DishesController;
