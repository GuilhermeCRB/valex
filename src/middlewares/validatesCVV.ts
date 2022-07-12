import Cryptr from "cryptr";
import { Request, Response, NextFunction } from "express";

import * as cardRepository from '../../repositories/cardRepository.js';

export default async function validateCVV(req: Request, res: Response, next: NextFunction) {
    const { id, CVV } : { id: number, CVV: string } = req.body;

    const card = await cardRepository.findById(id);
    const cardCVV = decryptCVV(card.securityCode);
    if(cardCVV !== CVV) return res.status(401).send("Unauthorized");

    res.locals.card = card;

    next();
}

function decryptCVV(CVV: string){
    const cryptr = new Cryptr(process.env.SECRET_KEY);

    return cryptr.decrypt(CVV);
}