const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class CartsRepository {
  async findById(id) {
    try {
      const cart = await knex("carts").where({ id }).first();

      return cart;
    } catch (err) {
      throw new AppError(err);
    }
  }

  async findCartItensById(id) {
    try {
      const existingItems = await knex("cart_items")
        .where({ cart_id: id })
        .select("dish_id");

      return existingItems;
    } catch (err) {
      throw new AppError(err);
    }
  }

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

  async update(existingItems, cart_items, id) {
    try {
      const updatedItems = cart_items.map(({ dish_id, name, quantity }) => {
        if (existingItems.some((item) => item.dish_id === dish_id)) {
          return knex("cart_items")
            .where({ cart_id: id, dish_id })
            .update({ quantity });
        } else {
          return knex("cart_items").insert({
            cart_id: id,
            dish_id,
            name,
            quantity,
          });
        }
      });

      const cartUpdate = {
        updated_at: knex.fn.now(),
      };


      await Promise.all(updatedItems);
      await knex("carts").where({ id }).update(cartUpdate);
    } catch (err) {
      throw new AppError(err);
    }
  }
}

module.exports = CartsRepository;
