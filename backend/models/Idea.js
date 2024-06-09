import { DataTypes } from "sequelize";

export function createIdeaModel(database){
  database.define('Idea', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.TEXT
    },
    description: {
      type: DataTypes.TEXT
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

