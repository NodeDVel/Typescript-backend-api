import { NextFunction, Request, Response } from 'express';

const loginReqCheck = (req: Request, res: Response, next: NextFunction) => {
    const { id, password } = req.body;

    if(!id || !password) {
        res.status(500).json({
            result: {
                SUCCESS: false,
                message: 'Server Error',
            },
        });
    } else {
        next();
    }
}

export default loginReqCheck;