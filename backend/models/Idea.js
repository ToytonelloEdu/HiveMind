import { DataTypes } from "sequelize";

export function createModel(database){
  database.define('Idea', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    downvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    isMarkDown: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
    //createdAt and updatedAt

  }, {

  })
}

