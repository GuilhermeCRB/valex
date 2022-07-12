import { Request, Response } from "express";

import { TransactionTypes } from '../../repositories/cardRepository.js';

import * as cardsService from '../services/cardsService.js';
import * as cardRepository from '../../repositories/cardRepository.js';


export async function createCard(req: Request, res: Response) {
    const { employeeId, type } : { employeeId: number, type: TransactionTypes } = req.body;

    const cardInfo = await cardsService.generateCardInfo(employeeId, type);
    await cardRepository.insert(cardInfo);

    return res.sendStatus(201);
}