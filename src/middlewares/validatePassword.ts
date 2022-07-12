import Cryptr from "cryptr";

import { Request, Response, NextFunction } from "express";

export default async function validatePassword(req: Request, res: Response, next: NextFunction) {
    const { cardPassword }: { cardPassword: string } = req.body;
    const { password }: { password: string } = res.locals.card;

    const RegisteredPassword = decryptPassword(password);
    if (RegisteredPassword !== cardPassword) return res.status(401).send("Unauthorized");

    next();
}

function decryptPassword(password: string) {
    const cryptr = new Cryptr(process.env.SECRET_KEY);

    return cryptr.decrypt(password);
}