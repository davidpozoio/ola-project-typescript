import { Sequelize } from "sequelize";
import ENV from "../const/env";

const sequelize = new Sequelize({
  database: ENV.DATABASE_NAME,
  host: ENV.DATABASE_HOST,
  username: ENV.DATABASE_USERNAME,
  password: ENV.DATABASE_PASSWORD,
  dialect: "mysql",
  pool: {
    max: 10,
  },
});

export default sequelize;
