import { Request, Response, NextFunction } from "express";

import * as cardRepository from '../../repositories/cardRepository.js';

export default async function validateCardId(req: Request, res: Response, next: NextFunction) {
    const { cardId }: { cardId: number } = req.body;

    const card = await cardRepository.findById(cardId);
    if(!card) return res.status(404).send("Card not found");

    next();
}