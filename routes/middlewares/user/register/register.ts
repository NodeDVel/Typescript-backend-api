import { NextFunction, Request ,Response } from 'express'
import User from '@Model/user.model';

const register = async (req: Request, res: Response, next: NextFunction) => {
    const { id, name } = req.body;
    const password = res.locals.temp;

    try {
        const user: User = await User.create({
            id,
            password,
            name,
        });

        if(!user) {
            res.status(500).json({
                SUCCESS: false,
                message: 'db Error',
            });
        } else {
            res.status(200).json({
                SUCCESS: true,
                message: 'sign up Ok!',
            });
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({
            SUCCESS: false,
            message: 'Server Error',
        })
    }
};

export default register;