import { Request, Response } from "express";

import { TransactionTypes } from '../../repositories/cardRepository.js';

import * as cardsService from '../services/cardsService.js';
import * as cardRepository from '../../repositories/cardRepository.js';


export async function createCard(req: Request, res: Response) {
    const { type }: { type: TransactionTypes } = req.body;
    const { employee } = res.locals;

    const cardInfo = cardsService.generateCardInfo(employee, type);
    await cardRepository.insert(cardInfo);

    return res.sendStatus(201);
}

export async function activateCard(req: Request, res: Response) {
    const { id, cardPassword }: { id: number, cardPassword: string } = req.body;
    if (+cardPassword < 1000 || +cardPassword > 9999) return res.status(422).send("Password must be in four numbers format");

    const { securityCode }: { securityCode: string } = res.locals.card;

    const cardData = cardsService.buildCardData(cardPassword, securityCode);

    await cardRepository.update(id, cardData);

    res.sendStatus(200);
}