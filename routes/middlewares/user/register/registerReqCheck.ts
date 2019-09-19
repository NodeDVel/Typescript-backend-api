import { NextFunction, Request, Response } from 'express';

const registerReqCheck = (req: Request, res: Response, next: NextFunction) => {
    const { id, password } = req.body;

    if(!id || !password) {
        res.status(500).json({
            SUCCESS: false,
            message: 'DB Error',
        });
    } else {
        next();
    }
}

export default registerReqCheck;