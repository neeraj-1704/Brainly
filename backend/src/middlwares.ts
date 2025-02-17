import { Request, Response, NextFunction } from "express"
import { JWT_PASS } from './config'
import jwt from 'jsonwebtoken';

export const useMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // duing the post man teetgin pass the json token to the header section of the postman
    const header = req.headers["Authorizations"];
    const decoded = jwt.verify(header as string, JWT_PASS);

    if (!decoded) {
        // @ts-ignore
        res.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json({
            message: "Incorrect Creaditials"
        })
    }
    //override the types of the express request Object

}