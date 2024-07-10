import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IdeaItem } from './idea-item.type';
import { AuthRequest } from './auth-request.type';
import { VoteItem } from './vote-item.type';
import { CommentItem } from './comment-item.type';


@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  url = "http://localhost:3000";
  constructor(private http: HttpClient ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  login(loginReq: AuthRequest){
    const url = `${this.url}/auth`;
    return this.http.post<string>(url, loginReq, this.httpOptions);
  }

  signup(signupReq: AuthRequest){
    const url = `${this.url}/signup`;
    return this.http.post<string>(url, signupReq, this.httpOptions);
  }

  getIdeas() {
    const url = `${this.url}/`;
    return this.http.get<IdeaItem[]>(url, this.httpOptions);
  }

  

  getPopularIdeas() {
    const url = `${this.url}/popular`;
    return this.http.get<IdeaItem[]>(url, this.httpOptions);
  }

  getUnpopularIdeas() {
    const url = `${this.url}/unpopular`;
    return this.http.get<IdeaItem[]>(url, this.httpOptions);
  }
  
  getIdeaById(id: number) {
    const url = `${this.url}/ideas/${id}`;
    return this.http.get<IdeaItem>(url, this.httpOptions);
  }

  createIdea(idea: IdeaItem) {
    const url = `${this.url}/ideas`;
    return this.http.post<IdeaItem>(url, idea, this.httpOptions);
  }

  deleteIdea(idea: IdeaItem) {
    const url = `${this.url}/ideas/${idea.id}`;
    return this.http.delete<IdeaItem>(url, this.httpOptions);
  }

  updateVotes(idea: IdeaItem) {
    const url = `${this.url}/ideas/${idea.id}/votes`;
    return this.http.put<IdeaItem>(url, idea, this.httpOptions);
  }

  getVote(ideaid: number, username: string) {
    const url = `${this.url}/ideas/${ideaid}/${username}/votes`;
    return this.http.get<VoteItem>(url, this.httpOptions);
  }

  postVote(vote: VoteItem) {
    const url = `${this.url}/votes`;
    return this.http.post<VoteItem>(url, vote, this.httpOptions);
  }

  putVote(vote: VoteItem) {
    const url = `${this.url}/votes`;
    return this.http.put<VoteItem>(url, vote, this.httpOptions);
  }

  postComment(comment: CommentItem) {
    const url = `${this.url}/ideas/${comment.IdeaId}/comments`;
    return this.http.post<CommentItem>(url, comment, this.httpOptions);
  }

}
