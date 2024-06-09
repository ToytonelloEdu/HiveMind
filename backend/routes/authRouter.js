import express from "express";
import { AuthController } from "../controllers/AuthController.js";

export const authenticationRouter = express.Router();

/**
*      application/json:
*              {
*                user:
*                  type: string
*                  example: Kyle
*                passw:
*                  type: string
*                  example: p4ssw0rd
*               }
*      responses:
*        200: User authenticated
*        401: Invalid credentials
*/
authenticationRouter.post("/auth", async (req, res) => {
    let isAuthenticated = await AuthController.checkCredentials(req, res);
    if(isAuthenticated) {
        res.json(AuthController.issueToken(req.body.user));
    } else {
        res.status(401);
        res.json( {error: "Invalid credentials. Try again"} );
    }
});

authenticationRouter.post("/signup", (req, res, next) => {
    AuthController.saveNewUser(req, res).then((user) => {
        res.json(user);
    }).catch((err) => {
        next({status: 500, message: "Could not save user"});
    });
});
