import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";

import { groupValidate } from "../../validations/group.validation";
import { CustomError } from "../../utils/customError";
import { dataSource } from "../../database/typeorm";
import { Group } from "../../entities/group.entity";
import { IGroup } from "../../types/group.type";

export async function getGroups(_: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const groupRepository: Repository<Group> = dataSource.getRepository(Group);
        const groups = await groupRepository.find();
        res.status(200).json({ message: 'Success', groups });
    } catch (error) {
        next(error);
    }
}

export async function getGroup(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const { groupId } = req.params as { groupId: string };
        const groupRepository: Repository<Group> = dataSource.getRepository(Group);

        const group = await groupRepository.findOneBy({groupId});

        res.status(200).json({ message: 'Success', group });
    } catch (error: unknown) {
        next(error);
    }
}

export async function deleteGroup(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const { groupId } = req.params as { groupId: string };
        const groupRepository: Repository<Group> = dataSource.getRepository(Group);

        const deletedGroup = await groupRepository.findOneBy({ groupId }); 
        await groupRepository.delete(groupId);

        res.status(200).json({ message: 'Success', deletedGroup });
    } catch (error: unknown) {
        next(error);
    }
}

export async function createGroup(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
        const { groupName }: IGroup = req.body;
        const groupRepository: Repository<Group> = dataSource.getRepository(Group);

        const isValid: any = groupValidate({ groupName });
        if(isValid) throw new CustomError(isValid, 400);

        const group = await groupRepository.findOne({ where: { groupName }});
        if(group) throw new CustomError(`${groupName} already exists`, 409);

        const newGroup = groupRepository.create({ groupName });
        await groupRepository.save(newGroup);

        res.status(201).json({ message: 'Success', newGroup });
    } catch (error: unknown) {
        next(error);
    }
}