import { router as adminStudent } from "./admin-student.route";
import { router as adminProject } from "./admin-project.route";
import { router as adminGroup } from "./admin-group.route";
import { router as adminExam } from "./admin-exam.route";
import { router as admin } from "./admin.route";

import { router as studentProject } from "./student-project.route";
import { router as studentExam } from "./student-exam.route";
import { router as student } from "./student.route";


export default [ admin, adminStudent, adminExam, adminGroup, adminProject, student, studentExam, studentProject ];