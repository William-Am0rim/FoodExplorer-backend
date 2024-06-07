
const AppError = require("../utils/AppError");
const CartsCreateService = require("../services/CartsCreateService");
const CartsUpdateService = require("../services/CartsUpdateService")
const CartsRepository = require("../repositories/CartsRepository");
const knex = require("../database/knex");

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
      console.log()
      throw new AppError(err);
    }
  }

  async update(request, response) {
    try{
 
      const cartsRepository = new CartsRepository();
      const cartsUpdateService = new CartsUpdateService(cartsRepository);

      cartsUpdateService.execute(request.params, request.body)
      
      return response.json();
    }catch(err){
      throw new AppError(err)
    }
  }

  async index(request, response) {
    const user_id = request.user.id;

    const carts = await knex("carts")
      .select("id", "created_at")
      .where({ created_by: user_id })
      .orderBy("created_at", "desc");

    return response.json(carts);
  }
  
}








module.exports = CartsController;

