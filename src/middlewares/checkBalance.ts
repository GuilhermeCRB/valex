import { Request, Response, NextFunction } from "express";

import * as paymentRepository from '../../repositories/paymentRepository.js';
import * as rechargeRepository from '../../repositories/rechargeRepository.js';
import { calculateBalance } from "../../utils/calculateBalance.js";

export default async function checkBalance(req: Request, res: Response, next: NextFunction) {
    const {cardId, amount}: {cardId: number, amount: number} = req.body;
    if(amount <= 0) return res.status(400).send("Payment must be greater than zero");

    const transactions = await paymentRepository.findByCardId(cardId);
    const recharges = await rechargeRepository.findByCardId(cardId);

    const balance = calculateBalance(transactions, recharges);
    if(balance - amount < 0) return res.status(401).send("Payment unauthorized");

    next();
}