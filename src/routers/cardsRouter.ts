import { Router } from "express";

import { createCard } from "../controllers/cardsController.js";

const cardsRouter = Router();

cardsRouter.post("/cards", createCard);

export default cardsRouter;