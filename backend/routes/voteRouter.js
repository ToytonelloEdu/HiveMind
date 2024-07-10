import express from "express";
import { VoteController } from "../controllers/VoteController.js";
import { enforceAuth } from "../middleware/authorization.js";

export const voteRouter = new express.Router();



voteRouter.post("/votes", enforceAuth, (req, res, next) => {
    VoteController.saveVote(req).then( result => {
        res.json(result);
    }).catch( err => {
        next(err);
    })
});

voteRouter.put("/votes", enforceAuth, (req, res, next) => {
    let usern = req.body.UserUsername;
    let ideaid = req.body.IdeaId;
    let upvote = req.body.upvote;
    VoteController.updateVote(usern, ideaid, upvote).then( result => {
        res.json(result);
    }).catch( err => {
        next(err);
    });
});