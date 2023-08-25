import { Request, Response } from "express";

export const errorHandler = (err: any, _: Request, res: Response): void => {
    if( err instanceof Error ) {
        res.status(500).json({error: 'Internal server error'});
    }else{
        res.status(err.statusCode).json({error: err.message});
    }
};
