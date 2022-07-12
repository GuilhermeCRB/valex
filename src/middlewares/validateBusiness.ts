import { Request, Response, NextFunction } from "express";

import * as businessRepository from '../../repositories/businessRepository.js';

export default async function validateBusiness(req: Request, res: Response, next: NextFunction) {
    const { businessId }: { businessId: number } = req.body;
    const { card } = res.locals;

    const business = await businessRepository.findById(businessId);
    if(!business) return res.status(404).send("Stablishment not found");

    if(card.type !== business.type) return res.status(401).send("Card cannot be used in this stablishment");

    next();
}