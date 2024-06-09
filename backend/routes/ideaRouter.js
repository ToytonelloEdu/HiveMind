import express from "express";
import { IdeaController } from "../controllers/IdeaController.js";
import { ensureUserModifiesOwnIdeas } from "../middleware/authorization.js";

export const ideaRouter = new express.Router();

ideaRouter.get("/ideas", (req, res, next) => {
    IdeaController.getAllIdeas().then(todoItems => {
      res.json(todoItems)
    }).catch(err => {
      next(err);
    });
  });

  
ideaRouter.post("/ideas", (req, res, next) => {
    IdeaController.saveIdea(req).then( result => {
        res.json(result);
    }).catch(err => {
        next(err);
    });
});


ideaRouter.get("/ideas/:id", ensureUserModifiesOwnIdeas, (req, res, next) => {
    IdeaController.findById(req).then( (item) => {
        res.json(item);
    }).catch( err => {
        next(err);
    })
});



ideaRouter.delete("/ideas/:id", ensureUserModifiesOwnIdeas, (req, res, next) => {
    IdeaController.delete(req).then( (item) => {
        res.json(item);
    }).catch( err => {
        next(err);
    })
});
