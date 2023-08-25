import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Repository } from "typeorm";
import config from "config";

import { CustomError } from "../../utils/customError";
import { Admin } from "../../entities/admin.entity";
import { dataSource } from "../../database/typeorm";
import { verifyPayload } from "../../utils/jwt";

export async function isAdmin(req: Request, _res: Response, next: NextFunction): Promise<void> {
    try {
        const adminRepository: Repository<Admin> = dataSource.getRepository(Admin);
        const { token } = req.cookies;
        const defaultAdminEmail =  config.get('ownEmail');

        const adminId: string | JwtPayload = verifyPayload(token) as JwtPayload;
        if(!adminId) throw new CustomError("Invalid Token", 403); // Use CutomError to return error response
        
        const admin = await adminRepository.findOneBy({adminId: adminId.toString()});
        if(!admin) throw new CustomError('Admin Not Found', 404);

        if(admin.email !== defaultAdminEmail) throw new CustomError('Not Allowed', 409);
        
        next();
    } catch (error) {
        next(error);
    }
}