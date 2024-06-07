const AppError = require("../utils/AppError");

class CartsCreateService {
  constructor(cartsRepository) {
    this.cartsRepository = cartsRepository;
  }

  async execute(requestCarts, user_id) {
    try {
      const { cart_items } = requestCarts;
      const itemsInsert = cart_items.map(
        async ({ dish_id, name, quantity }) => {
          return {
            cart_id,
            dish_id,
            name,
            quantity,
          };
        }
      );

      const createCarts = await this.cartsRepository.create(
        itemsInsert,
        user_id
      );

      return createCarts;
    } catch (err) {
      throw new AppError(err);
    }
  }
}


module.exports = CartsCreateService
