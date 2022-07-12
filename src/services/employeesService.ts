import Cryptr from 'cryptr';

import * as paymentRepository from '../../repositories/paymentRepository.js';
import * as rechargeRepository from '../../repositories/rechargeRepository.js';

export function buildCardData(cardPassword: string, securityCode: string) {
    const password = encryptPassword(cardPassword);

    return { securityCode, password, isBlocked: false };
}

function encryptPassword(cardPassword: string) {
    const cryptr = new Cryptr(process.env.SECRET_KEY);

    return cryptr.encrypt(cardPassword);
}

export async function buildHistoric(cardId: number) {
    const transactions = await paymentRepository.findByCardId(cardId);
    const recharges = await rechargeRepository.findByCardId(cardId);

    const balance = calculateBalance(transactions, recharges);

    return buildHistoricData(balance, transactions, recharges);
}

function calculateBalance(transactions: paymentRepository.PaymentWithBusinessName[], recharges: rechargeRepository.Recharge[]) {
    let transactionsFullAmount = 0;
    let rechargesFullAmount = 0;

    transactions.forEach(transaction => transactionsFullAmount += transaction.amount);
    recharges.forEach(recharge => rechargesFullAmount += recharge.amount);

    return rechargesFullAmount - transactionsFullAmount;
}

function buildHistoricData(balance: number, transactions: paymentRepository.PaymentWithBusinessName[], recharges: rechargeRepository.Recharge[]) {
    return ({
        balance,
        transactions,
        recharges
    });
}