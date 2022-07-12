import Cryptr from "cryptr";

import { Request, Response, NextFunction } from "express";

export default async function validateCVV(req: Request, res: Response, next: NextFunction) {
    const { CVV }: { CVV: string } = req.body;
    const { securityCode }: { securityCode: string } = res.locals.card;

    const cardCVV = decryptCVV(securityCode);
    if (cardCVV !== CVV) return res.status(401).send("Unauthorized");

    next();
}

function decryptCVV(CVV: string) {
    const cryptr = new Cryptr(process.env.SECRET_KEY);

    return cryptr.decrypt(CVV);
}