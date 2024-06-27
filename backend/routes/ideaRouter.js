import express from "express";
import { IdeaController } from "../controllers/IdeaController.js";
import { ensureUserModifiesOwnIdeas, enforceAuth } from "../middleware/authorization.js";

export const ideaRouter = new express.Router();


ideaRouter.post("/ideas", enforceAuth, (req, res, next) => {
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

ideaRouter.put("/ideas/:id/votes", enforceAuth, (req, res, next) => {
    IdeaController.updateVotes(req.params.id, req.body).then( (item) => {
     if(item)
        res.json(item);
     else 
        next({status: 404, message: "Todo not found"});
    }).catch( err => {
        next(err);
    });
});