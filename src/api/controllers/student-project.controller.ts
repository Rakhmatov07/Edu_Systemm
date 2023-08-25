import { NextFunction, Response } from "express";
import { Repository } from "typeorm";
import { v4 as uuid } from "uuid";
import path from "path";

import { projectValidate } from "../../validations/project.validation";
import { IStudentRequest } from "src/types/studentRequest.type";
import { Project } from "../../entities/project.entity";
import { CustomError } from "../../utils/customError";
import { IProject } from "../../types/project.type";
import { dataSource } from "../../database/typeorm";
import { Exam } from "../../entities/exam.entity";
 
export async function getProjects(req: IStudentRequest, res: Response, next: NextFunction): Promise<void>{
    try {
        const { studentId } = req.student;
        const projectRepository: Repository<Project> = dataSource.getRepository(Project);

        const projects = await projectRepository.findBy({ studentId });

        res.status(200).json({ message: 'Success', projects });
    } catch (error) {
        next(error);
    }
}

export async function getProject(req: IStudentRequest, res: Response, next: NextFunction): Promise<void>{
    try {
        const { projectId } = req.params;
        const { studentId } = req.student;
        const projectRepository: Repository<Project> = dataSource.getRepository(Project);

        const project = await projectRepository.findOne({ where: { projectId, studentId }});
        res.status(200).json({ message: 'Success', project });
    } catch (error) {
        next(error);
    }
}

export async function sendProject(req: IStudentRequest, res: Response, next: NextFunction): Promise<void>{
    try {
        const { projectName, studentComment, groupId } = req.body as IProject; 
        const { examId } = req.params;
        const { file }: any = req.files;
        const { studentId } = req.student;
        
        const projectRepository: Repository<Project> = dataSource.getRepository(Project);
        const examRepository: Repository<Exam> = dataSource.getRepository(Exam);

        if(!file) throw new CustomError('File Not Found', 400);

        const isValid = projectValidate({ projectName, groupId, examId });
        if(isValid) throw new CustomError(isValid, 400);
        
        const exam: any = await examRepository.findOneBy({ examId });
        const endTime: number = new Date(exam.createdAt).setHours(new Date(exam.createdAt).getHours() + Number(exam.duration));

        if(new Date(endTime) < new Date()) throw new CustomError('Deadline end', 409);

        const project: any = await projectRepository.findOne({ where: { examId , studentId}});
        if(project?.attempts == 0) throw new CustomError('You do not have attempts', 409);
        
        if(!project){
            const fileName: string = `${uuid()}${path.extname(file.name)}`;
            
            const newProject = projectRepository.create({
                projectName,
                fileName,
                studentComment,
                groupId,
                examId,
                studentId,
            });

            await projectRepository.save(newProject);
            file.mv(process.cwd() + '/src/public/uploads/' + fileName);

            res.status(201).json({ message: 'Success', newProject });
        }else{
            const fileName: string = `${uuid()}${path.extname(file.name)}`;
            
            project.projectName = projectName ?? project.projectName;
            project.studentComment = studentComment ?? project.studentComment;
            project.groupId = groupId ?? project.groupId;
            project.attempts -= 1; 
            
            file.mv(process.cwd() + '/src/public/uploads/' + fileName);

            await projectRepository.save(project);
            res.status(201).json({ message: 'Success', project });
        }

    } catch (error) {
        next(error);
    }
}