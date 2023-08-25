import Joi from "joi";

import { IRegister } from "../types/register.type";

export function registerValidate(user: IRegister): boolean | string{
    const registerSchema: Joi.ObjectSchema<IRegister> = Joi.object({
        firstname: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        email: Joi.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required(),
        password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required()
    });

    const { error }: {error: Joi.ValidationError | undefined} = registerSchema.validate(user);
    return error ? error.message : false;
}