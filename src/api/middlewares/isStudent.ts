import { NextFunction, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Repository } from "typeorm";

import { IStudentRequest } from "src/types/studentRequest.type";
import { Student} from "../../entities/student.entity";
import { CustomError } from "../../utils/customError";
import { dataSource } from "../../database/typeorm";
import { verifyPayload } from "../../utils/jwt";

export async function isStudent(req: IStudentRequest, _: Response, next: NextFunction) {
    try {
        const studentRepository: Repository<Student> = dataSource.getRepository(Student);
        const { token } = req.cookies;

        const studentId: string | JwtPayload = verifyPayload(token) as JwtPayload;
        if(!studentId) throw new CustomError("Invalid Token", 403); // Use CutomError to return error response
        
        const student = await studentRepository.findOne({ where: { studentId: studentId.toString() } });
        if(!student) throw new CustomError('Student Not Found', 404);

        req.student = student;
        next();
    } catch (error) {
        next(error);
    }
}