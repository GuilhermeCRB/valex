import { Router } from "express";

import { createCard, rechargeCard } from "../controllers/companiesController.js";
import validateApiKey from "../middlewares/validateApiKey.js";
import validateEmployee from "../middlewares/validateEmployee.js";
import validateRecharge from "../middlewares/validateRecharge.js";

const companiesRouter = Router();

companiesRouter.use(validateApiKey);
companiesRouter.post("/cards", validateEmployee, createCard);
companiesRouter.post("/cards/recharge", validateRecharge, rechargeCard);

export default companiesRouter;