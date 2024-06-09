import { Sequelize } from "sequelize";
import { createIdeaModel } from "./Idea.js";
import { createUserModel } from "./User.js";

import 'dotenv/config.js'; //read .env file and make it available in process.env

export const database = new Sequelize(process.env.DB_CONNECTION_URI, {
  dialect: process.env.DIALECT
});

createIdeaModel(database);
createUserModel(database);


export const {User, Idea} = database.models;

User.Ideas = User.hasMany(Idea);
Idea.User = Idea.belongsTo(User);
 
//synchronize schema (creates missing tables)
database.sync({force: true}).then( () => {
  console.log("Database synced correctly");
}).catch( err => {
  console.err("Error with database synchronization: " + err.message);
});