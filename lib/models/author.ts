import { DataTypes } from "sequelize";
import { getSequelize } from "../db/postgres";

const sequelize = getSequelize();

export const Author = sequelize.define(
  "Author",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
    },
    born_date: {
      type: DataTypes.DATE,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "authors",
    timestamps: false,
  }
);
