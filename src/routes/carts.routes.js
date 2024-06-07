/*
const { Router } = require("express");

const CartsController = require("../controllers/CartsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const cartsRoutes = Router();

const cartsController = new CartsController();

cartsRoutes.use(ensureAuthenticated);

cartsRoutes.post("/", cartsController.create);


module.exports = cartsRoutes;*/

const { Router } = require("express");

const CartsController = require("../controllers/CartsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const cartsRoutes = Router();

const cartsController = new CartsController();

cartsRoutes.use(ensureAuthenticated);

cartsRoutes.get("/", cartsController.index);
cartsRoutes.post("/", cartsController.create);
cartsRoutes.patch("/:id", cartsController.update);

module.exports = cartsRoutes;
