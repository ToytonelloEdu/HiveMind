import { Time } from "@angular/common";

export interface CommentItem {
    id?: number,
    comment: string,
    IdeaId: number,
    UserUsername: string,
    createdAt?: string
}