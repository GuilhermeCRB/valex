import { Router } from "express";

import companiesRouter from "./companiesRouter.js";
import employeesRouter from "./employeesRouter.js";

const router = Router();

router.use(employeesRouter);
router.use(companiesRouter);

export default router;