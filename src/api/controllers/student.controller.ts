import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";

import { registerValidate } from "../../validations/register.validation";
import { mailData, transporter } from "../../utils/emailVerification";
import { loginValidate } from "../../validations/login.validation";
import { comparePayload, hashPayload } from "../../utils/bcrypt";
import { Student } from "../../entities/student.entity";
import { CustomError } from "../../utils/customError";
import { IRegister } from "../../types/register.type";
import { dataSource } from "../../database/typeorm";
import { ILogin } from "../../types/login.type";
import { signPayload } from "../../utils/jwt";
import { redis } from "../../database/redis";

export async function register(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const { firstname, lastname, email, password } = req.body as IRegister;

        const studentRepository: Repository<Student> = dataSource.getRepository(Student);

        const isValid: any  = registerValidate({ firstname, lastname, email, password });
        if(isValid) throw new CustomError(isValid, 400);

        const student = await studentRepository.findOne({ where: { email }});
        if(student) throw new CustomError('Already Registered', 409);
    
        const code = Math.floor((Math.random()*1000000)+1);
        await redis.set(email, code, 'EX', 60);
        
        const emailData = mailData(email, 'Registration', 'Do you agree to registre?', `<b>Hey there!</b><br> Your verification code: ${code}.<br/>`);
        transporter.sendMail(emailData);

        const hashedPass = await hashPayload(password);
        const newStudent = studentRepository.create({ firstname, lastname, email, password: hashedPass });
        await studentRepository.save(newStudent);

        res.status(200).json({ message: 'Verify your email!' });
    } catch (error) {
        next(error);
    }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const { email, password } = req.body as ILogin;
        const studentRepository: Repository<Student> = dataSource.getRepository(Student);

        const isValid: any = loginValidate({ email, password });
        if(isValid) throw new CustomError(isValid, 400);

        const student = await studentRepository.findOne({ where: {email}});
        if(!student) throw new CustomError('Not Found', 404);

        const checkPass = await comparePayload(password, student.password);
        if(!checkPass) throw new CustomError('Invalid Password', 403);

        const token: string = signPayload(student.studentId);

        res.cookie('token', token);
        res.status(200).json({ message: 'Successfully logged In' });
    } catch (error) {
        next(error);
    }
}

export async function logout(_: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        res.cookie('token', '');
        res.status(200).json({ message: 'Successfully logged Out' });
    } catch (error) {
        next(error);
    }
}

export async function verify(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const { email, code } = req.body;
        const studentRepository: Repository<Student> = dataSource.getRepository(Student);

        const redisCode = await redis.get(email);
        const student = await studentRepository.findOne({ where: { email }});
      
        if(!student) throw new CustomError('Student Not Found', 404);

        if(code != redisCode){
            await studentRepository.delete({ email });
            throw new CustomError('Invalid Verification code!\nTry again!', 403);
        }

        const token: string = signPayload(student.studentId);

        res.cookie('token', token);
        res.status(201).json({ message: 'Successfully Registered' });
    } catch (error) {
        next(error);
    }
}