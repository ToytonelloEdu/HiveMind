import { Sequelize } from "sequelize";
import { createModel as createIdeaModel } from "./Idea.js";
import { createModel as createUserModel } from "./User.js";
import { createModel as createVoteModel } from "./Votes.js";
import { createModel as createCommentModel } from "./Comments.js";

import 'dotenv/config.js'; //read .env file and make it available in process.env

export const database = new Sequelize(process.env.DB_CONNECTION_URI, {
  dialect: process.env.DIALECT
});

createIdeaModel(database);
createUserModel(database);
createVoteModel(database);
createCommentModel(database);

export const {User, Idea, Vote, Comment} = database.models;

User.Ideas = User.hasMany(Idea);
Idea.User = Idea.belongsTo(User);

Idea.belongsToMany(User, {through: Vote});
User.belongsToMany(Idea, {through: Vote});

Comment.belongsTo(Idea);
Comment.belongsTo(User);
Idea.hasMany(Comment);
User.hasMany(Comment);

 
//synchronize schema (creates missing tables)
database.sync(
// {force: true}
).then( () => {
  console.log("Database synced correctly");
}).catch( err => {
  console.err("Error with database synchronization: " + err.message);
});