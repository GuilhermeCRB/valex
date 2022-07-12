import { Request, Response, NextFunction } from "express";

import { TransactionTypes } from "../../repositories/cardRepository.js";

import * as employeeRepository from '../../repositories/employeeRepository.js';
import * as cardRepository from '../../repositories/cardRepository.js';

export default async function validateEmployee(req: Request, res: Response, next: NextFunction) {
    const { employeeId, type }: { employeeId: number, type: TransactionTypes } = req.body;
    const companyId = res.locals.company.id;

    const employee = await employeeRepository.findById(employeeId);
    if (!employee || employee.companyId !== companyId) return res.status(404).send("Employee not found");

    const card = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
    if(card) return res.status(409).send(`Employee already have a/an ${type} card`);

    res.locals.employee = employee;

    next();
}