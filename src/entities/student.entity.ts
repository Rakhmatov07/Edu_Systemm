import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";

import { Project } from "./project.entity";
import { Group } from "./group.entity";


@Entity('students')
export class Student {
    @PrimaryGeneratedColumn("uuid")
    studentId!: string;

    @Column({ name: "firstname", nullable: false })
    firstname!: string;

    @Column({ name: "lastname", nullable: false })
    lastname!: string;

    @Column({ name: "email", nullable: false, unique: true })
    email!: string;
    
    @Column({ name: "password", nullable: false })
    password!: string;

    @Column({ name: "isAllowed", default: false })
    isAllowed!: boolean;

    @ManyToOne(() => Group, (group) => group.students, { cascade: true })
    @JoinColumn({ name: 'groupId', referencedColumnName: 'groupId' })
    groupId!: string;

    @OneToMany(() => Project, (project) => project.studentId)
    projects!: Project[]
}