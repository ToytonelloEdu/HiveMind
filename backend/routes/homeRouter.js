import express from "express";
import { HomeController } from "../controllers/HomeController.js";
import { enforceAuth } from "../middleware/authorization.js";

export const homeRouter = new express.Router();

homeRouter.get("/", enforceAuth, (req, res, next) => {
    HomeController.getHomepageIdeas().then( result => {
        res.json(result);
    }).catch(err => {
        next(err);
    });
});

homeRouter.get("/popular", enforceAuth, (req, res, next) => {
    HomeController.getPopularIdeas().then( result => {
        res.json(result);
    }).catch(err => {
        next(err);
    });
});

homeRouter.get("/unpopular", enforceAuth, (req, res, next) => {
    HomeController.getUnpopularIdeas().then( result => {
        res.json(result);
    }).catch(err => {
        next(err);
    });
});