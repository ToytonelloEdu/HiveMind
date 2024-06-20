export interface IdeaItem {
    id?: number;
    title: string;
    description: string;
    upvotes: number;
    downvotes: number;
    isMarkDown?: boolean;
    UserUsername?: string; 
    createdAt?: Date; 
    updatedAt?: Date;
}