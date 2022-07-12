import { Router } from "express";

import { activateCard, blockCard, createCard, getHistoric, unblockCard } from "../controllers/cardsController.js";
import validateApiKey from "../middlewares/validateApiKey.js";
import validateBlock from "../middlewares/validateBlock.js";
import validateCard from "../middlewares/validateCard.js";
import validateCardId from "../middlewares/validateCardId.js";
import validateEmployee from "../middlewares/validateEmployee.js";
import validatePassword from "../middlewares/validatePassword.js";
import validateCVV from "../middlewares/validatesCVV.js";
import validateUnblock from "../middlewares/validateUnblock.js";

const cardsRouter = Router();

cardsRouter.get("/cards/historic", validateCardId, getHistoric);
cardsRouter.post("/cards", validateApiKey, validateEmployee, createCard);
cardsRouter.put("/cards", validateCard, validateCVV, activateCard);
cardsRouter.put("/cards/block", validateBlock, validatePassword, blockCard);
cardsRouter.put("/cards/unblock", validateUnblock, validatePassword, unblockCard);

export default cardsRouter;