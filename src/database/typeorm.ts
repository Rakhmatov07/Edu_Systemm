import { DataSource } from "typeorm";

import { Project } from "../entities/project.entity";
import { Student } from "../entities/student.entity";
import { Admin } from "../entities/admin.entity";
import { Group } from "../entities/group.entity";
import { Exam } from "../entities/exam.entity";
 
export const dataSource: DataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1207",
    database: "examcontroller",
    synchronize: true,
    logging: false,
    entities: [Admin, Student, Group, Exam, Project],
})