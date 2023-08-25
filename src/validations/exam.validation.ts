import Joi from "joi";

import { IExam } from "../types/exam.type";

export function examValidate(exam: IExam): string | boolean{
    const examSchema: Joi.ObjectSchema<IExam> = Joi.object({
        title: Joi.string().min(3).required(),
        description: Joi.string().min(5).required(),
        duration: Joi.number().required(),
        maxScore: Joi.number().required(),
        passingScore: Joi.number().required(),
        groupId: Joi.string().required(),
    });

    const { error }: { error: Joi.ValidationError | undefined } = examSchema.validate(exam);
    return error ? error.message : false;
}