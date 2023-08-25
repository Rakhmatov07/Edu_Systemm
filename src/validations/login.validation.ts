import Joi from "joi";

import { ILogin } from "../types/login.type";

export function loginValidate(user: ILogin): string | boolean{
    const loginSchema: Joi.ObjectSchema<ILogin> = Joi.object({
        email: Joi.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).required(),
        password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required()
    });

    const { error }: { error: Joi.ValidationError | undefined } = loginSchema.validate(user);
    return error ? error.message : false;
}