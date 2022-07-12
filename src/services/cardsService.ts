import { faker } from '@faker-js/faker';
import dayjs from "dayjs";

import { TransactionTypes } from '../../repositories/cardRepository.js';

import * as employeeRepository from '../../repositories/employeeRepository.js';

export async function generateCardInfo(employeeId: number, type: TransactionTypes) {
    const { fullName } = await employeeRepository.findById(employeeId);

    const number = faker.finance.creditCardNumber('visa');
    const cardholderName = manipulateName(fullName);
    const securityCode = faker.finance.creditCardCVV();
    const expirationDate = calculateExpirationDate();

    return {
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        isVirtual: false,
        isBlocked: true,
        type,
    };
}

function manipulateName(fullName: string){
    const nameArray = fullName.toUpperCase().split(" ");
    const firstName = nameArray[0];
    const lastName = nameArray[nameArray.length - 1];

    const cardholderNameArray = nameArray.map(name => {      
        if(name !== firstName && name !== lastName){
            return name[0];
        };

        return name;
    });

    return cardholderNameArray.join(" ");
}

function calculateExpirationDate(){
    const today = dayjs();

    return dayjs(today).add(5, "year").format("MM/YY");
}