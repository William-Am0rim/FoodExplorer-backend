const AppError = require("../utils/AppError");

class DisheIndexService {
  constructor(disheRepository, ingredientRepository) {
    this.disheRepository = disheRepository;
    this.ingredientRepository = ingredientRepository;
  }

  async execute(requestSearch) {
    try {
      const { search } = requestSearch;
      let dishes;

      if (search) {
        const keywords = search.split(" ").map((keyword) => `%${keyword}%`);
        dishes = await this.disheRepository.searchDisheTrue(keywords);
      } else {
        dishes = await this.disheRepository.searchDisheFalse();
      }

      const dishesIngredients = await this.ingredientRepository.ingredientAll();

      const dishesWithIngredients = dishes.map((dish) => {
        const dishIngredients = dishesIngredients.filter(
          (ingredient) => ingredient.dish_id === dish.id
        );

        return {
          ...dish,
          ingredients: dishIngredients,
        };
      });

      return dishesWithIngredients;
    } catch (err) {
      throw new AppError(err);
    }
  }
}

module.exports = DisheIndexService;
