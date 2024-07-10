import { Sequelize } from "sequelize";
import { Comment, Idea } from "../models/Database.js";

export class CommentController {
    static async getCommentsByIdea(ideaid) {
        const comments = await Comment.findAll({
            where: {
                IdeaId: ideaid
            },
            order: [
                [Sequelize.literal('createdAt'), 'DESC']
            ]
        });

        return comments;
    }

    static async saveComment(ideaid, body) {
        let idea = await Idea.findByPk(ideaid);
        const comments = idea.getDataValue('comments');
        idea.setDataValue('comments', comments+1);
        await idea.save();

        let comment = new Comment({
            comment: body.comment,
            UserUsername: body.UserUsername,
            IdeaId: ideaid
        })

        return comment.save();
    }


}