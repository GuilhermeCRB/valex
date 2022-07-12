import express, { json } from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";

import router from "./routers/index.js";
import errorHandler from "./middlewares/errorHandlerMiddleware.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandler);

const port = +process.env.PORT || 5000;
app.listen(port, () => {
    console.log(chalk.white.bold.bgGreenBright(`\n Application is running on port ${port}... \n`));
});