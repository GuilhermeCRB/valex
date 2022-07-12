import { Request, Response, NextFunction } from "express";

import * as employeeRepository from '../../repositories/employeeRepository.js';

export default async function validateEmployee(req: Request, res: Response, next: NextFunction) {
    const { employeeId }: { employeeId: number } = req.body;
    const companyId = res.locals.company.id;

    const employee = await employeeRepository.findById(employeeId);
    if (!employee || employee.companyId !== companyId) res.status(404).send("Employee not found");

    res.locals.employee = employee;

    next();
}