import { Request, Response } from "express";

import * as employeesService from '../services/employeesService.js';
import * as cardRepository from '../../repositories/cardRepository.js';
import * as paymentRepository from '../../repositories/paymentRepository.js';


export async function activateCard(req: Request, res: Response) {
    const { id, cardPassword }: { id: number, cardPassword: string } = req.body;
    const { securityCode }: { securityCode: string } = res.locals.card;

    const cardData = employeesService.buildCardData(cardPassword, securityCode);

    await cardRepository.update(id, cardData);

    res.sendStatus(200);
}

export async function getHistoric(req: Request, res: Response) {
    const { cardId }: { cardId: number } = req.body;

    const historic = await employeesService.buildHistoric(cardId);

    return res.status(200).send(historic);
}

export async function blockCard(req: Request, res: Response) {
    const { id }: { id: number } = req.body;

    await cardRepository.update(id, {isBlocked: true});
    
    return res.sendStatus(200);
}

export async function unblockCard(req: Request, res: Response) {
    const { id }: { id: number } = req.body;

    await cardRepository.update(id, {isBlocked: false});
    
    return res.sendStatus(200);
}

export async function pay(req: Request, res: Response) {
    const {cardId, businessId, amount}: {cardId: number, businessId: number, amount: number} = req.body;

    await paymentRepository.insert({cardId, businessId, amount});

    return res.sendStatus(200);
}