const AppError = require("../utils/AppError");

class CartsUpdateService {
  constructor(cartsRepository) {
    this.cartsRepository = cartsRepository;
  }

  async execute(resquestParams, requestBody) {
    try {
      const { id } = resquestParams;
      const { cart_items } = requestBody;

      const cart = await this.cartsRepository.findById(id);

      if (!cart) {
        throw new AppError("Carrinho não encontrado.", 404);
      }

      const cartUpdate = {
        updated_at: knex.fn.now(),
      };

      const existingItems = await this.cartsRepository.findCartItensById(id);

      await this.cartsRepository.update(existingItems,cart_items, cartUpdate, id);

    
    } catch (err) {
      throw new AppError(err);
    }
  }
}

module.exports = CartsUpdateService;
