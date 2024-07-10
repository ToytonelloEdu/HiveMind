import { Sequelize, Op } from "sequelize";
import { Idea } from "../models/Database.js";


export class HomeController {

    static async getHomepageIdeas(req){
        const pastWeek = new Date();
        pastWeek.setDate(pastWeek.getDate()-7);

        const ideas = await Idea.findAll({
            where: {
                createdAt: {[Op.gte] : pastWeek}
            },
            attributes: [
                'id',
                'title',
                'description',
                'isMarkDown',
                'upvotes',
                'downvotes',
                'comments',
                'UserUsername',
                [Sequelize.literal('ABS(upvotes - downvotes)'), 'votesDiff'],
                [Sequelize.literal('(upvotes+downvotes)'), 'votesSum']
            ],
            order: [
                [Sequelize.literal('votesSum'), 'DESC'],
                [Sequelize.literal('votesDIff'), 'ASC']
            ]
        });

        return ideas;
    }

    static async getPopularIdeas(req){
        const pastWeek = new Date();
        pastWeek.setDate(pastWeek.getDate()-7);

        const ideas = await Idea.findAll({
            where: {
                createdAt: {[Op.gte] : pastWeek}
            },
            attributes: [
                'id',
                'title',
                'description',
                'isMarkDown',
                'upvotes',
                'downvotes',
                'comments',
                'UserUsername',
                [Sequelize.literal('ABS((upvotes+1)/(downvotes+1))'), 'votesRatio']
            ],
            order: [
                [Sequelize.literal('votesRatio'), 'DESC']
            ],
            
        });

        return ideas;
    }

    static async getUnpopularIdeas(req){
        const pastWeek = new Date();
        pastWeek.setDate(pastWeek.getDate()-7);

        const ideas = await Idea.findAll({
            where: {
                createdAt: {[Op.gte] : pastWeek}
            },
            attributes: [
                'id',
                'title',
                'description',
                'isMarkDown',
                'upvotes',
                'downvotes',
                'comments',
                'UserUsername',
                [Sequelize.literal('ABS((upvotes+1)/(downvotes+1))'), 'votesRatio']
            ],
            order: [
                [Sequelize.literal('votesRatio'), 'ASC']
            ],
            
        });

        return ideas;
    }
    
}