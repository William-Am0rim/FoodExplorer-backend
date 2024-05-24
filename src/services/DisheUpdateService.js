const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DisheUpdateService {
  constructor(disheRepository, ingredientRepository) {
    this.disheRepository = disheRepository;
    this.ingredientRepository = ingredientRepository;
  }
  async execute(requestDishe, dishId, requestImg, userId, dataUpdate) {
    try {
      console.log(requestDishe, dishId, requestImg);
      const { id } = dishId;
      const { name, description, category, price, ingredients } = requestDishe;
      const imageFilename = requestImg;

      const dish = await this.disheRepository.dishById(dishId);

      if (!dish) {
        throw new AppError("Prato não encontrado.", 404);
      }

      const dishUpdate = {
        name: name ?? dish.name,
        description: description ?? dish.description,
        category: category ?? dish.category,
        price: price ?? dish.price,
        updated_by: userId,
        updated_at: dataUpdate,
      };

      if (imageFilename) {
        const diskStorage = new DiskStorage();

        if (dish.image) {
          await diskStorage.deleteFile(dish.image);
        }

        const filename = await diskStorage.saveFile(imageFilename);
        dishUpdate.image = filename;
      }

      if (ingredients) {
        await this.ingredientRepository.deleteIngredient(id);

        const ingredientsInsert = ingredients.map((name) => {
          return {
            dish_id: id,
            name,
            created_by: dish.created_by,
          };
        });
        await this.ingredientRepository.createIngredient(ingredientsInsert);
      }
    } catch (err) {
      console.log(err);
      throw new AppError(err);
    }
  }
}

module.exports = DisheUpdateService;
