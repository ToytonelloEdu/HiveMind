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
                'isMarkdown',
                'upvotes',
                'downvotes',
                [Sequelize.literal('ABS(upvotes - downvotes)'), 'votesDiff'],
                [Sequelize.literal('(upvotes+downvotes)'), 'votesSum']
            ],
            order: [
                [Sequelize.literal('votesSum'), 'DESC'],
                [Sequelize.literal('votesDIff'), 'ASC']
            ],
            limit: 10
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
                'isMarkdown',
                'upvotes',
                'downvotes',
                [Sequelize.literal('ABS(upvotes/downvotes)', 'votesRatio')]
            ],
            order: [
                [Sequelize.literal('votesRatio'), 'DESC']
            ],
            limit: 10
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
                'isMarkdown',
                'upvotes',
                'downvotes',
                [Sequelize.literal('ABS(upvotes/downvotes)', 'votesRatio')]
            ],
            order: [
                [Sequelize.literal('votesRatio'), 'ASC']
            ],
            limit: 10
        });

        return ideas;
    }
    
}