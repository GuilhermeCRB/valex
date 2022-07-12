import { Request, Response, NextFunction } from "express";

import * as cardRepository from '../../repositories/cardRepository.js';

export default async function validateBlock(req: Request, res: Response, next: NextFunction) {
    const { id }: { id: number } = req.body;

    const card = await cardRepository.findById(id);
    if(!card) return res.status(404).send("Card not found");
}