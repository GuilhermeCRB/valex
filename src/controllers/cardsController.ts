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
    const { id }: { id: number } = req.body;
    const CVV = "a16b58c6b58ed01749c65c6b066cb20e20eb52179bf9f5a693f0d705dc26d5f6c2817a4e3427d472bda1b7628c243bbe599f77088439d7c90fd69587ea64385e0838f4eaae418f71c8fbfcbde305d6efdcf2673339e7d482edf28a845069f9d5a86092"
    const password = "aaa";
    const cardData = { securityCode: CVV, password, isBlocked: false };

    await cardRepository.update(id, cardData);

    res.sendStatus(200);
}