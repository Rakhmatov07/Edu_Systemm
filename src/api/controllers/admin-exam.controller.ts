import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";

import { examValidate } from "../../validations/exam.validation";
import { CustomError } from "../../utils/customError";
import { dataSource } from "../../database/typeorm";
import { Exam } from "../../entities/exam.entity"
import { IExam } from "../../types/exam.type";

export async function getExams(_: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const examRepository: Repository<Exam> = dataSource.getRepository(Exam);
        const exams = await examRepository.find();
        res.status(200).json({ message: 'Success', exams });
    } catch (error: unknown) {
        next(error);
    }
}

export async function getExam(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const examRepository: Repository<Exam> = dataSource.getRepository(Exam);
        const { examId } = req.params as { examId: string };
        const exam = await examRepository.findOneBy({examId});

        res.status(200).json({ message: 'Success', exam });
    } catch (error: unknown) {
        next(error);
    }
}

export async function getExamsByGroup(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const examRepository: Repository<Exam> = dataSource.getRepository(Exam);
        const { groupId } = req.params as { groupId: string };
        const exams = await examRepository.find({ where: { groupId } });
        res.status(200).json({ message: 'Success', exams });
    } catch (error: unknown) {
        next(error);
    }
}

export async function deleteExam(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const examRepository: Repository<Exam> = dataSource.getRepository(Exam);
        const { examId } = req.params as { examId: string };
        const deletedExam = await examRepository.findOneBy({ examId });
        await examRepository.delete({ examId });

        res.status(200).json({ message: 'Success', deletedExam });
    } catch (error: unknown) {
        next(error);
    }
}

export async function createExam(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const examRepository: Repository<Exam> = dataSource.getRepository(Exam);
        const { title, description, duration, maxScore, passingScore, groupId } = req.body as IExam;    

        const isValid: any = examValidate({ title, description, duration, maxScore, passingScore, groupId });
        if(isValid) throw new CustomError(isValid, 400);

        const exam = await examRepository.findOne({ where: { title, description, groupId }});
        if(exam) throw new CustomError(`'${title}' exam already exists`, 409);
        
        const newExam = new Exam();
        newExam.title = title;
        newExam.description = description;
        newExam.duration = duration;
        newExam.maxScore = maxScore;
        newExam.passingScore = passingScore;
        newExam.groupId = groupId;
        
        await examRepository.save(newExam);

        res.status(201).json({ message: 'Success', newExam });
    } catch (error: unknown) {
        next(error);
    }
}

