import { Request, Response, NextFunction } from "express";

import * as companyRepository from "../../repositories/companyRepository.js"

export default async function validateApiKey(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const apiKey = authorization?.replace("X-API-Key:", "").trim();

    if (!apiKey) return res.sendStatus(401);

    const company = await companyRepository.findByApiKey(apiKey);
    if (!company) return res.sendStatus(401);

    res.locals.company = company;

    next();
}