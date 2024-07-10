import express from "express";
import { IdeaController } from "../controllers/IdeaController.js";
import { ensureUserModifiesOwnIdeas, enforceAuth } from "../middleware/authorization.js";
import { CommentController } from "../controllers/CommentController.js";
import { VoteController } from "../controllers/VoteController.js";

export const ideaRouter = new express.Router();


ideaRouter.post("/ideas", enforceAuth, (req, res, next) => {
    IdeaController.saveIdea(req).then( result => {
        res.json(result);
    }).catch(err => {
        next(err);
    });
});

ideaRouter.get("/ideas/:id", ensureUserModifiesOwnIdeas, (req, res, next) => {
    IdeaController.findById(req).then( (idea) => {
        let ideaValues = idea.dataValues;
        CommentController.getCommentsByIdea(idea.id).then( comments => {
            ideaValues.commentItems = comments;
            res.json(ideaValues);
        })        
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

ideaRouter.get("/ideas/:id/:username/votes", enforceAuth, (req, res, next) => {
    VoteController.getVoteByPk(req.params.id, req.params.username).then( result => {
        res.json(result)
    }).catch( err => {
        next(err);
    });
})

ideaRouter.put("/ideas/:id/votes", enforceAuth, (req, res, next) => {
    IdeaController.updateVotes(req.params.id, req.body).then( (item) => {
     if(item)
        res.json(item);
     else 
        next({status: 404, message: "Idea not found"});
    }).catch( err => {
        next(err);
    });
});

ideaRouter.post("/ideas/:id/comments", enforceAuth, (req, res, next) => {
    CommentController.saveComment(req.params.id, req.body).then( result => {
        res.json(result);
    }).catch( err => {
        next(err);
    });
});