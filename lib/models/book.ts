import { DataTypes } from "sequelize";
import { getSequelize } from "../db/postgres";
import { Author } from "./author";

const sequelize = getSequelize();

export const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    published_date: {
      type: DataTypes.DATE,
    },
    author_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Author,
        key: "id",
      },
      onDelete: "CASCADE", // Books get deleted if an author is deleted
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "books",
    timestamps: false,
  }
);

// Define the relationship between Book and Author
Book.belongsTo(Author, { foreignKey: "author_id", as: "author" });
Author.hasMany(Book, { foreignKey: "author_id", as: "books" });
