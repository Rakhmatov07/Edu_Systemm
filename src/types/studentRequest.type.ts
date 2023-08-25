import { Request } from "express";

import { IStudent } from "./student.type";

export interface IStudentRequest extends Request {
    student: IStudent;
}