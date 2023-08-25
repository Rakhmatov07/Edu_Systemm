import Joi from "joi";

import { IGroup } from "../types/group.type";

export function groupValidate(group: IGroup): string | boolean{
    const groupSchema: Joi.ObjectSchema<IGroup> = Joi.object({
        groupName: Joi.string().min(3).required()
    });

    const { error }: { error: Joi.ValidationError | undefined } = groupSchema.validate(group);
    return error ? error.message : false;
}