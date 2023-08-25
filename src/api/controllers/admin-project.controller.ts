import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";

import { Project } from "../../entities/project.entity";
import { dataSource } from "../../database/typeorm";
import { Exam } from "../../entities/exam.entity";

export async function getProjects(_: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const projectRepository: Repository<Project> = dataSource.getRepository(Project);

        const projects = await projectRepository.find();
        res.status(200).json({ message: 'Success', projects });
    } catch (error) {
        next(error);
    }
}

export async function getProjectsByExam(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const { examId } = req.params as { examId: string };
        const projectRepository: Repository<Project> = dataSource.getRepository(Project);        

        const projects = await projectRepository.findBy({ examId });
        res.status(200).json({ message: 'Success',  projects });
    } catch (error) {
        next(error);
    }
}

export async function getProjectsByGroup(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const { groupId } = req.params as { groupId: string };
        const projectRepository: Repository<Project> = dataSource.getRepository(Project);

        const projects = await projectRepository.findBy({groupId});
        res.status(200).json({ message: 'Success',  projects });
    } catch (error) {
        next(error);
    }
}

export async function getProjectsByStudent(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const { studentId } = req.params as { studentId: string };
        const projectRepository: Repository<Project> = dataSource.getRepository(Project);

        const projects = await projectRepository.findBy({studentId});
        res.status(200).json({ message: 'Success',  projects });
    } catch (error) {
        next(error);
    }
}

export async function getProject(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const { projectId } = req.params as { projectId: string };
        const projectRepository: Repository<Project> = dataSource.getRepository(Project);

        const project = await projectRepository.findOneBy({projectId});
        res.status(200).json({ message: 'Success',  project });
    } catch (error) {
        next(error);
    }
}

export async function markStudentProject(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const { projectId } = req.params as { projectId: string };
        const { score, teacherComment }: { score: number, teacherComment: string } = req.body;
        
        const projectRepository: Repository<Project> = dataSource.getRepository(Project);
        const examRepository: Repository<Exam> = dataSource.getRepository(Exam);

        const project: any = await projectRepository.findOneBy({projectId});
        const exam: any = await examRepository.findOneBy({ examId: project.examId});

        if(exam.passingScore < score){
            project.isPassed = true;
        } else {
            project.isPassed = false;
        }

        project.score = score;
        project.teacherComment = teacherComment ?? '';
        
        await projectRepository.save(project);

        res.status(200).json({ message: 'Success' });
    } catch (error) {
        next(error);
    }
}