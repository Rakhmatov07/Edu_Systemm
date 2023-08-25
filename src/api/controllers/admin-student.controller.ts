import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";

import { Student } from "../../entities/student.entity";
import { CustomError } from "../../utils/customError";
import { dataSource } from "../../database/typeorm";

export async function getStudents(_: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const studentRepository: Repository<Student> = dataSource.getRepository(Student);
        const students = await studentRepository.find();

        res.status(200).json({ message: 'Success', students });
    } catch (error) {
        next(error);
    }
}

export async function getStudent(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const { studentId } = req.params;
        const studentRepository: Repository<Student> = dataSource.getRepository(Student);
        if(!studentId) throw new CustomError('Bad request!', 400);

        const student = await studentRepository.findOneBy({studentId});
        res.status(200).json({ message: 'Success', student });
    } catch (error) {
        next(error);
    }
}

export async function getStudentsByStatus(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const { isAllowed } = req.query as { isAllowed: any };
        
        const studentRepository: Repository<Student> = dataSource.getRepository(Student);
        const students = await studentRepository.find({ where: { isAllowed }});

        res.status(200).json({ message: 'Success', students });
    } catch (error) {
        next(error);
    }
}

export async function addStudentToGroup(req: Request, res: Response, next: NextFunction): Promise<void>{    
    try {
        const studentRepository: Repository<Student> = dataSource.getRepository(Student);
        const { groupId } = req.body;
        const { studentId } = req.params;

        const student: any = await studentRepository.findOneBy({studentId});
        if(!student) throw new CustomError('Not Found', 404);
        student.isAllowed = true;
        student.groupId = groupId;
        await studentRepository.save(student);
        
        res.status(200).json({ message: 'Success', student });
    } catch (error) {
        next(error);
    }
}

export async function deleteStudentFromGroup(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const { studentId } = req.params;
        const studentRepository: Repository<Student> = dataSource.getRepository(Student);

        const student: any = await studentRepository.findOneBy({studentId});
        if(!student) throw new CustomError('Not Found', 404);
        
        student.isAllowed = false;
        await studentRepository.save(student)
        
        res.status(200).json({ message: 'Success', student });
    } catch (error) {
        next(error);
    }
}
