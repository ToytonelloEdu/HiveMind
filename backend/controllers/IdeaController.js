import { Idea } from "../models/Database.js";

export class IdeaController {
    
    static async saveIdea(req) {
      let idea = new Idea({
        title: req.body.title,
        description: req.body.description,
        isMarkDown: req.body.isMarkDown,
        UserUsername: req.body.UserUsername
      });
      return idea.save();
    }
  
    static async findById(req) {
      return Idea.findByPk(req.params.id);
    }
  
    static async delete(req) {
      return new Promise( (resolve, reject) => {
        this.findById(req).then( item => {
          item.destroy().then( () => {resolve(item)})
        })
      })
    }

    static async updateVotes(id, updated) {
      let idea = await Idea.findByPk(id);
      idea.setDataValue('upvotes', updated.upvotes);
      idea.setDataValue('downvotes',updated.downvotes);
      return idea.save();
    }

    static async updateComments(id, updated) {
      let idea = await Idea.findByPk(id);
      idea.setDataValue('comments', updated.comments);
      return idea.save();
    }
  }