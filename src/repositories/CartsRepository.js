const AppError = require("../utils/AppError");

class CartsRepository {
  async create(itemsInsert, user_id) {
    try {
      const [cart_id] = await knex("carts").insert({
        created_by: user_id,
      });

      await knex("cart_items").insert(await Promise.all(itemsInsert));

      return { id: cart_id };
    } catch (err) {
      throw new AppError(err);
    }
  }
}

module.exports = CartsRepository;
