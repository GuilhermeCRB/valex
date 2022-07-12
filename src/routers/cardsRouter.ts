import { Router } from "express";

import { activateCard, createCard, getHistoric } from "../controllers/cardsController.js";
import validateApiKey from "../middlewares/validateApiKey.js";
import validateCard from "../middlewares/validateCard.js";
import validateEmployee from "../middlewares/validateEmployee.js";
import validateCVV from "../middlewares/validatesCVV.js";

const cardsRouter = Router();

cardsRouter.post("/cards", validateApiKey, validateEmployee, createCard);
cardsRouter.put("/cards", validateCard, validateCVV, activateCard);
cardsRouter.get("/cards/historic", getHistoric);

export default cardsRouter;