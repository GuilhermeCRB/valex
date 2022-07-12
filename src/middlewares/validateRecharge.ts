import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

import { Request, Response, NextFunction } from "express";

import * as cardRepository from '../../repositories/cardRepository.js';

export default async function validateRecharge(req: Request, res: Response, next: NextFunction) {
    const { cardId }: { cardId: number } = req.body;
    const card = await cardRepository.findById(cardId);
    if(!card) return res.status(404).send("Card not found");

    const today = dayjs();
    dayjs.extend(customParseFormat);
    if(today.isAfter(dayjs(card.expirationDate, "MM/YY"), "month")) return res.status(400).send(`Card expired in ${card.expirationDate}`);

    if(!card.password) return res.status(401).send("Card is inactive");

    next();
}