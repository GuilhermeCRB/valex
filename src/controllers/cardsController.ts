import { Request, Response } from "express";

import { TransactionTypes } from '../../repositories/cardRepository.js';

import * as cardsService from '../services/cardsService.js';
import * as cardRepository from '../../repositories/cardRepository.js';


export async function createCard(req: Request, res: Response) {
    const { type }: { type: TransactionTypes } = req.body;
    const { employee } = res.locals;

    const cardInfo = await cardsService.generateCardInfo(employee, type);
    await cardRepository.insert(cardInfo);

    return res.sendStatus(201);
}