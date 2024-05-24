const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const CartsCreateService = require("../services/CartsCreateService");
const CartsRepository = require("../repositories/CartsRepository");

class CartsController {
  async create(request, response) {
    try {
      const cartsRepository = new CartsRepository();
      const cartsCreateService = new CartsCreateService(cartsRepository);

      const createCarts = await cartsCreateService.execute(
        request.body,
        request.user.id
      );

      return response.json(createCarts);
    } catch (err) {
      throw new AppError(err);
    }
  }
}

module.exports = CartsController;
