import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";

import { Project } from "./project.entity";
import { Group } from "./group.entity";

@Entity('exams')
export class Exam {
    @PrimaryGeneratedColumn("uuid")
    examId!: string;

    @Column({ name: 'title', nullable: false })
    title!: string;

    @Column({ name: 'description', nullable: false })
    description!: string;

    @Column({ name: 'duration', nullable: false })
    duration!: number;

    @Column({ name: 'maxScore', nullable: false })
    maxScore!: number;

    @Column({ name: 'passingScore', nullable: false })
    passingScore!: number;

    @Column({ name: 'createdAt', type: "time with time zone", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @OneToMany(() => Project, (project) => project.examId)
    projects!: Project[];

    @ManyToOne(() => Group, (group) => group.exams)
    @JoinColumn({ name: 'groupId', referencedColumnName: 'groupId' })
    groupId!: string;
}