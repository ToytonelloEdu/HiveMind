import { DataTypes } from "sequelize";



export function createModel(database) {
    database.define('Vote', {
        upvote: { //true->upvote; false->downvote
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },{

    })
}