import pg from "pg";
import { Sequelize } from "sequelize";
//importing models to sync them
import { Book } from "../models/book";
import { Author } from "../models/author";

let sequelize: Sequelize;

export function getSequelize() {
  if (!process.env.POSTGRES_URL) throw new Error("POSTGRES_URL not set");
  if (!sequelize)
    sequelize = new Sequelize(process.env.POSTGRES_URL, {
      dialect: "postgres",
      dialectModule: pg,
      logging: false,
    });

  return sequelize;
}

export async function connectToPostgres() {
  const sequelize = getSequelize();
  await sequelize.sync({ alter: true });

  return await sequelize.authenticate();
}
