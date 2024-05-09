const ENV = {
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  MODE: process.env.MODE,
  SECRET: process.env.SECRET,
  EMAIL_RESEND_TOKEN: process.env.EMAIL_RESEND_TOKEN,
  EMAIL_RESEND: process.env.EMAIL_RESEND,
  PORT: process.env.PORT,
  API_PREFIX: process.env.API_PREFIX,
  IP: process.env.IP,
};

export default ENV;
