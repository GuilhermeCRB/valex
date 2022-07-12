import { Router } from "express";

import { activateCard, blockCard, createCard, getHistoric } from "../controllers/cardsController.js";
import validateApiKey from "../middlewares/validateApiKey.js";
import validateBlock from "../middlewares/validateBlock.js";
import validateCard from "../middlewares/validateCard.js";
import validateCardId from "../middlewares/validateCardId.js";
import validateEmployee from "../middlewares/validateEmployee.js";
import validateCVV from "../middlewares/validatesCVV.js";

const cardsRouter = Router();

cardsRouter.get("/cards/historic", validateCardId, getHistoric);
cardsRouter.post("/cards", validateApiKey, validateEmployee, createCard);
cardsRouter.put("/cards", validateCard, validateCVV, activateCard);
cardsRouter.put("/cards/block", validateBlock, blockCard);

export default cardsRouter;