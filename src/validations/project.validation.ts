import Joi from "joi";

export function projectValidate(project: any): string | false{
    const projectSchema = Joi.object({
        projectName: Joi.string().required(),
        groupId: Joi.string().required(),
        examId: Joi.string().required()
    });

    const { error }: {error: Joi.ValidationError | undefined} = projectSchema.validate(project);
    return error ? error.message : false;
}