import Joi from 'joi';

const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('admin', 'user', 'superadmin').required(),
});

export { authSchema };