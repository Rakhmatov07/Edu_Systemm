import { NextFunction, Response } from "express";
import { Repository } from "typeorm";

import { IStudentRequest } from "src/types/studentRequest.type";
import { Student } from "../../entities/student.entity";
import { CustomError } from "../../utils/customError";
import { dataSource } from "../../database/typeorm";
import { Exam } from "../../entities/exam.entity";

export async function getExams(req: IStudentRequest, res: Response, next: NextFunction): Promise<void>{
    try {
        const { studentId } = req.student;
        const studentRepository: Repository<Student> = dataSource.getRepository(Student);
        const examRepository: Repository<Exam> = dataSource.getRepository(Exam);

        const student: any = await studentRepository.findOneBy({studentId});
        if(!student) throw new CustomError('Not Found', 404);

        const exams = await examRepository.find({ where: { groupId: student.groupId }});

        res.status(200).json({ message: 'Success', exams });
    } catch (error) {
        next(error);
    }
}

export async function getExam(req: IStudentRequest, res: Response, next: NextFunction): Promise<void>{
    try {
        const { examId } = req.params;
        const examRepository: Repository<Exam> = dataSource.getRepository(Exam);

        const exam = await examRepository.findOneBy({examId});

        res.status(200).json({ message: 'Success', exam });
    } catch (error) {
        next(error);
    }
}