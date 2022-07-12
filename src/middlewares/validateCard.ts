import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js"

import { Request, Response, NextFunction } from "express";

import * as cardRepository from '../../repositories/cardRepository.js';

export default async function validateCard(req: Request, res: Response, next: NextFunction) {
    const { id, cardPassword }: { id: number, cardPassword: string } = req.body;
    if (+cardPassword < 1000 || +cardPassword > 9999) return res.status(422).send("Password must be in four numbers format");

    const card = await cardRepository.findById(id);
    if(!card) return res.status(404).send("Card not found");

    const today = dayjs();
    dayjs.extend(customParseFormat);
    if(today.isAfter(dayjs(card.expirationDate, "MM/YY"), "month")) return res.status(400).send(`Card expired in ${card.expirationDate}`);

    if(card.password) return res.status(400).send("Card was already activated");

    res.locals.card = card;
    
    next();
}