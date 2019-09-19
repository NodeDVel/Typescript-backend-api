import { NextFunction, Request, Response } from 'express';
import User from '@Model/user.model';

const CheckUser = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const { id } = req.body;

        await User.findOne({
            where: {
                id,
            },
        }).then((user: User) => {
            switch(req.path) {
                case '/register':
                    if(user) {
                        res.status(412).json({
                            result: {
                                SUCCESS: false,
                                message: '이미 존재하는 유저입니다',
                            }
                        });
                    } else {
                        next();
                    }
            
                case '/login': 
                    if(user) {
                        res.locals.user = user;
                        next();
                    } else {
                        res.status(412).json({
                            result: {
                                SUCCESS: false,
                                message: '존재하지 않는 유저입니다',
                            }
                        });
                    }
                }
        });
    } catch(err) {
        console.error(err);
        res.status(500).json({
            result: {
                SUCCESS: false,
                message: 'DB Error',
            }
        });
    }
    
}

export default CheckUser;