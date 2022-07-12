import { faker } from '@faker-js/faker';
import Cryptr from 'cryptr';
import dayjs from "dayjs";

import { Response } from "express";

import { Employee } from '../../repositories/employeeRepository.js';

import { TransactionTypes } from '../../repositories/cardRepository.js';

export function generateCardInfo(employee: Employee, type: TransactionTypes) {
    const { fullName, id } = employee;

    const number = faker.finance.creditCardNumber('visa');
    const cardholderName = manipulateName(fullName);
    const securityCode = generateEncryptedCVV();
    const expirationDate = calculateExpirationDate();

    return {
        employeeId: id,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        isVirtual: false,
        isBlocked: true,
        type,
    };
}

function manipulateName(fullName: string) {
    const nameArray = fullName.toUpperCase().split(" ").filter((name, i) => {
        if (name.length > 2 || i === 0 || i === name.length - 1) {
            return true;
        } else {
            return false;
        }
    });
    const firstName = nameArray[0];
    const lastName = nameArray[nameArray.length - 1];

    const cardholderNameArray = nameArray.map(name => {
        if (name !== firstName && name !== lastName) {
            return name[0];
        };

        return name;
    });

    return cardholderNameArray.join(" ");
}

function generateEncryptedCVV() {
    const cryptr = new Cryptr(process.env.SECRET_KEY);
    const CVV = faker.finance.creditCardCVV();

    return cryptr.encrypt(CVV);
}

function calculateExpirationDate() {
    const today = dayjs();

    return dayjs(today).add(5, "year").format("MM/YY");
}

export function buildCardData(cardPassword: string, securityCode: string){
    const password = encryptPassword(cardPassword);

    return { securityCode, password, isBlocked: false };
}

function encryptPassword(cardPassword: string){
    const cryptr = new Cryptr(process.env.SECRET_KEY);

    return cryptr.encrypt(cardPassword);
}