import { Vote } from "../models/Database.js";

export class VoteController {

    static async getVoteByPk(ideaid,usern) {
        return Vote.findOne({
            where: {
                IdeaId: ideaid,
                UserUsername: usern
            }
        });
    }

    static async saveVote(req) {
        let vote = new Vote({
            upvote: req.body.upvote,
            UserUsername: req.body.UserUsername,
            IdeaId: req.body.IdeaId
        });
        return vote.save();
    }

    static async updateVote(usern, ideaid, upvote) {
        let vote = await Vote.findOne({ 
            where:  {IdeaId: ideaid, UserUsername: usern}
        });
        vote.setDataValue('upvote', upvote);
        return vote.save();
    }
}