const DiskStorage = require("../providers/DiskStorage");
const AppError = require("../utils/AppError");

class DisheCreateService {
  constructor(disheRepository, ingredientRepository) {
    this.disheRepository = disheRepository;
    this.ingredientRepository = ingredientRepository;
  }

  async execute(requestDishe, image, user_id) {
    try {
      const diskStorage = new DiskStorage();
      const filename = await diskStorage.saveFile(image);

      const ingredientsArray = JSON.parse(requestDishe.ingredients || "[]");

      console.log(ingredientsArray, filename, requestDishe);

      const dish_id = await this.disheRepository.createDish(
        requestDishe,
        filename,
        user_id
      );

      const ingredientsInsert = ingredientsArray.map((name) => {
        return {
          dish_id,
          name,
          created_by: user_id,
        };
      });

      const ingredient_id = await this.ingredientRepository.createIngredient(
        ingredientsInsert
      );

      return { id: ingredient_id };
    } catch (err) {
      console.log(err);
      throw new AppError(err);
    }
  }
}

module.exports = DisheCreateService;
