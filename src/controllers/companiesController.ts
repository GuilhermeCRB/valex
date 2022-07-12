import { Request, Response } from "express";

import { TransactionTypes } from '../../repositories/cardRepository.js';

import * as companiesService from '../services/companiesService.js';
import * as cardRepository from '../../repositories/cardRepository.js';
import * as rechargeRepository from '../../repositories/rechargeRepository.js';


export async function createCard(req: Request, res: Response) {
    const { type }: { type: TransactionTypes } = req.body;
    const { employee } = res.locals;

    const cardInfo = companiesService.generateCardInfo(employee, type);
    await cardRepository.insert(cardInfo);

    return res.sendStatus(201);
}

export async function rechargeCard(req: Request, res: Response) {
    const {cardId, amount}: {cardId: number, amount: number} = req.body;
    if(amount <= 0) return res.status(400).send("Amount must be greater than zero");

    await rechargeRepository.insert({cardId, amount});

    return res.sendStatus(200);
}