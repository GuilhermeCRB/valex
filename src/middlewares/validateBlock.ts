import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

import { Request, Response, NextFunction } from "express";

import * as cardRepository from '../../repositories/cardRepository.js';

export default async function validateBlock(req: Request, res: Response, next: NextFunction) {
    const { id }: { id: number } = req.body;

    const card = await cardRepository.findById(id);
    if(!card) return res.status(404).send("Card not found");

    const today = dayjs();
    dayjs.extend(customParseFormat);
    if(today.isAfter(dayjs(card.expirationDate, "MM/YY"), "month")) return res.status(400).send(`Card expired in ${card.expirationDate}`);

    if(card.isBlocked) return res.status(400).send("Card is already blocked");

    res.locals.card = card;

    next();
}