import joi from 'joi';

const envVarSchema = joi
  .object({
    DB_PASS: joi.string().required(),
    DB_USER: joi.string().required(),
    DB_NAME: joi.string().required(),
    DB_HOST: joi.string().required(),

    PORT: joi.number().positive().default(4000),
  })
  .unknown();

export default envVarSchema;
