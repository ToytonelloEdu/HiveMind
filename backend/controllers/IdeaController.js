import { Idea } from "../models/Database.js";

export class IdeaController {
  
    static async getAllIdeas(){
      return Idea.findAll();
    }
    
    static async saveIdea(req){
      let idea = new Idea({
        title: req.body.title,
        description: req.body.description,
        isMarkDown: req.body.isMarkDown,
      });
      return idea.save();
    }
  
    static async findById(req){
      return Idea.findByPk(req.params.id);
    }
  
    static async update(req){
      let idea = await this.findById(req);
      idea.setDataValue('todo', req.body.todo);
      return idea.save();
    }
  
    static async delete(req){
      return new Promise( (resolve, reject) => {
        this.findById(req).then( item => {
          item.destroy().then( () => {resolve(item)})
        })
      })
    }
  }