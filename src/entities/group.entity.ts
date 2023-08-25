import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Student } from "./student.entity";
import { Project } from "./project.entity";
import { Exam } from "./exam.entity";

@Entity('groups')
export class Group{
    @PrimaryGeneratedColumn("uuid")
    groupId!: string;

    @Column({name: 'groupName', nullable: false, unique: true})
    groupName!: string;

    @OneToMany(() => Student, (student) => student.groupId)
    students!: Student[];

    @OneToMany(() => Project, (project) => project.groupId)
    projects!: Project[];

    @OneToMany(() => Exam, (exam) => exam.groupId)
    exams!: Exam[];
}