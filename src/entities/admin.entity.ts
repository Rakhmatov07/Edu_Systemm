import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('admins')
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    adminId!: string;

    @Column({ name: "email", nullable: false, unique: true })
    email!: string;

    @Column({ name: "password", nullable: false })
    password!: string;
}