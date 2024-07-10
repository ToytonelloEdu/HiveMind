import { DataTypes } from "sequelize";

export function createModel(database) {
    database.define('Comment', {
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{

    })
}