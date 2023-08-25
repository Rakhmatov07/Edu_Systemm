import { NextFunction, Request, Response } from "express"; 
import { Repository } from "typeorm";

import { loginValidate } from "../../validations/login.validation";
import { IRegister } from "../../types/register.type";
import { CustomError } from "../../utils/customError";
import { comparePayload } from "../../utils/bcrypt";
import { Admin } from "../../entities/admin.entity";
import { dataSource } from "../../database/typeorm";
import { signPayload } from "../../utils/jwt";

export async function login(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const { email, password }: IRegister = req.body;
        const adminRepository: Repository<Admin> = dataSource.getRepository(Admin);

        const isValid: any = loginValidate({ email, password });
        if(isValid) throw new CustomError(isValid, 400);
        
        const admin = await adminRepository.findOneBy({email});
        if(!admin) throw new CustomError('Not Found', 404);
        
        const checkPass: boolean = await comparePayload(password, admin.password);
        if(!checkPass) throw new CustomError('Invalid Password', 403);
        
        const token: string = signPayload(admin.adminId);

        res.cookie('token', token);
        res.status(200).json({ message: 'Successfully logged In' });
    } catch (error: unknown) {
        next(error);
    }
}

export async function logout(_: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        res.cookie('token', '');
        res.status(200).json({ message: 'Successfully logged Out' });
    } catch (error: unknown) {
        next(error);
    }
}