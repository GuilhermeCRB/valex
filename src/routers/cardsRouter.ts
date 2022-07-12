import { Router } from "express";

import { createCard } from "../controllers/cardsController.js";
import validateApiKey from "../middlewares/validateApiKey.js";
import validateEmployee from "../middlewares/validateEmployee.js";

const cardsRouter = Router();

cardsRouter.post("/cards", validateApiKey, validateEmployee, createCard);

export default cardsRouter;