import { CommentItem } from "./comment-item.type";

export interface IdeaItem {
    id?: number;
    title: string;
    description: string;
    upvotes: number;
    downvotes: number;
    comments: number;
    commentItems?: CommentItem[];
    isMarkDown: boolean;
    UserUsername: string; 
    createdAt?: Date; 
    updatedAt?: Date;
}