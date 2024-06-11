import { AuthController } from "../controllers/AuthController.js";

export function enforceAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[0];
    if(!token) {
        next({status: 401, message: "Unauthorized"});
        return;
    }
    AuthController.isTokenValid(token, (err, decodedToken) => {
        if(err) {
            next({status: 401, message: "Unauthorized"});
        } else {
            req.username = decodedToken.user;
            next();
        }
    });
}

export async function ensureUserModifiesOwnIdeas(req, res, next) {
    const user = req.username;
    const ideaId = req.params.id;
    const hasPermission = await AuthController.canUserModifyIdea(user, ideaId);
    if( hasPermission ) {
        next();
    } else {
        next({
            status: 403,
            messagge: "Forbidden! You can't view or modify this resource"
        });
    }
}