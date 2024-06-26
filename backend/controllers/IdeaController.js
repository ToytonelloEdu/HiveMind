import { Idea } from "../models/Database.js";

export class IdeaController {
    
    static async saveIdea(req) {
      console.log(req.body);
      let idea = new Idea({
        title: req.body.title,
        description: req.body.description,
        isMarkDown: req.body.isMarkDown,
        UserUsername: req.body.username
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

    static async addUpvote(req) {
      let idea = await this.findById(req);
      let currUpvotes = idea.getDataValue('upvotes');
      idea.setDataValue('upvotes', currUpvotes+1);
      return idea.save();
    }

    static async addDownvote(req) {
      let idea = await this.findById(req);
      let currDownvotes = idea.getDataValue('downvotes');
      idea.setDataValue('downvotes', currDownvotes+1);
      return idea.save();
    }

    static async removeUpvote(req) {
      let idea = await this.findById(req);
      let currUpvotes = idea.getDataValue('upvotes');
      idea.setDataValue('upvotes', currUpvotes-1);
      return idea.save();
    }

    static async removeDownvote(req) {
      let idea = await this.findById(req);
      let currDownvotes = idea.getDataValue('downvotes');
      idea.setDataValue('downvotes', currDownvotes1);
      return idea.save();
    }
  }