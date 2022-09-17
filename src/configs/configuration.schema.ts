import * as Joi from 'joi';

export const configurationchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  PORT: Joi.string().default(3100).required(),
  VERSION: Joi.string().required(),
  DB_CONNECTION: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
