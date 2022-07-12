import { Router } from "express";

import { createCard } from "../controllers/cardsController.js";
import validateApiKey from "../middlewares/validateApiKey.js";

const cardsRouter = Router();

cardsRouter.post("/cards", validateApiKey, createCard);

export default cardsRouter;