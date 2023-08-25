import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

import { Student } from "./student.entity";
import { Group } from "./group.entity";
import { Exam } from "./exam.entity";

@Entity('projects')
export class Project{
    @PrimaryGeneratedColumn('uuid')
    projectId!: string;

    @Column({ name: 'projectName', nullable: false })
    projectName!: string;

    @Column({ name: 'fileName', nullable: false })
    fileName!: string;

    @Column({ name: 'score', nullable: false, default: 0 })
    score!: number;

    @Column({ name: 'isPassed', nullable: false, default: false })
    isPassed!: boolean;

    @Column({ name: 'studentComment', nullable: false, default: ''})
    studentComment?: string;
    
    @Column({ name: 'teacherComment', nullable: false, default: '' })
    teacherComment?: string;

    @Column({ name: 'attempts', nullable: true, default: 2 })
    attempts!: number;

    @ManyToOne(() => Student, (student) => student.projects)
    @JoinColumn({ name: 'studentId', referencedColumnName: 'studentId' })
    studentId!: string;

    @ManyToOne(() => Group, (group) => group.projects)
    @JoinColumn({ name: 'groupId', referencedColumnName: 'groupId' })
    groupId!: string;

    @ManyToOne(() => Exam, (exam) => exam.projects)
    @JoinColumn({ name: 'examId', referencedColumnName: 'examId' })
    examId!: string;
}