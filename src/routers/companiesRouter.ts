import { Router } from "express";

import { createCard } from "../controllers/companiesController.js";
import validateApiKey from "../middlewares/validateApiKey.js";
import validateEmployee from "../middlewares/validateEmployee.js";

const companiesRouter = Router();

companiesRouter.post("/cards", validateApiKey, validateEmployee, createCard);

export default companiesRouter;