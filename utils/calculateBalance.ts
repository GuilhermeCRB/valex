import * as paymentRepository from '../repositories/paymentRepository.js';
import * as rechargeRepository from '../repositories/rechargeRepository.js';

export function calculateBalance(transactions: paymentRepository.PaymentWithBusinessName[], recharges: rechargeRepository.Recharge[]) {
    let transactionsFullAmount = 0;
    let rechargesFullAmount = 0;

    transactions.forEach(transaction => transactionsFullAmount += transaction.amount);
    recharges.forEach(recharge => rechargesFullAmount += recharge.amount);

    return rechargesFullAmount - transactionsFullAmount;
}