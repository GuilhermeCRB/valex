import { Router } from "express";

import { activateCard, blockCard, getHistoric, unblockCard } from "../controllers/employeesController.js";
import validateBlock from "../middlewares/validateBlock.js";
import validateCard from "../middlewares/validateCard.js";
import validateCardId from "../middlewares/validateCardId.js";
import validatePassword from "../middlewares/validatePassword.js";
import validateCVV from "../middlewares/validatesCVV.js";
import validateUnblock from "../middlewares/validateUnblock.js";

const employeesRouter = Router();

employeesRouter.get("/cards/historic", validateCardId, getHistoric);
employeesRouter.put("/cards", validateCard, validateCVV, activateCard);
employeesRouter.put("/cards/block", validateBlock, validatePassword, blockCard);
employeesRouter.put("/cards/unblock", validateUnblock, validatePassword, unblockCard);

export default employeesRouter;