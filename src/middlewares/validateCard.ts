import { Request, Response, NextFunction } from "express";

import * as cardRepository from '../../repositories/cardRepository.js';

export default async function validateCard(req: Request, res: Response, next: NextFunction) {
    const { id, cardPassword }: { id: number, cardPassword: string } = req.body;

    const card = await cardRepository.findById(id);
    if(!card) return res.status(404).send("Card not found");

    res.locals.card = card;
    
    next();
}