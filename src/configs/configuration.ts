export const configuration = () => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    SERVICE: process.env.SERVICE,
    VERSION: process.env.VERSION,
    JWT_SECRET: process.env.JWT_SECRET,
  };
};
