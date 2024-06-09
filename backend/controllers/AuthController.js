import { User, Idea } from "../models/Database.js";
import Jwt from "jsonwebtoken";

export class AuthController {

  static async checkCredentials(req, res) {
    let user = new User({ //user data specified in the request
      username: req.body.user, 
      password: req.body.passw
    });

    let select = User.findOne({
      where: {
        username: user.username,
        password: user.password
      }
    })

    return (select === null)
  }
      
    
  static async saveNewUser(req, res){
    let user = new User({
      username: req.body.user, 
      password: req.body.passw
    });
    return user.save();
  }
    
    static async findById(req){
        return User.findByPk(req.params.id);
    }

    static issueToken(username){
      return Jwt.sign({user:username}, process.env.TOKEN_SECRET, {expiresIn: `${24*60*60}s`});
    }
  
    static isTokenValid(token, callback){
      Jwt.verify(token, process.env.TOKEN_SECRET, callback);
    }

    static async canUserModifyIdea(user, ideaId){
      const idea = await Idea.findByPk(ideaId);
      return idea && idea.UserUserName === user;
    }
    
    /* static async update(req){
        let user = await this.findById(req);
        user.setDataValue('todo', req.body.todo);
        return user.save();
    }
    
    static async delete(req){
        return new Promise( (resolve, reject) => {
          this.findById(req).then( item => {
            item.destroy().then( () => {resolve(item)})
          })
        })
    } */

}