import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IdeaItem } from './idea-item.type';
import { AuthRequest } from './auth-request.type';


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

  addUpvoteIdea(idea: IdeaItem) {
    const url = `${this.url}/ideas/${idea.id}/upvote`;
    return this.http.post<IdeaItem>(url, this.httpOptions)
  }

  addDownvoteIdea(idea: IdeaItem) {
    const url = `${this.url}/ideas/${idea.id}/downvote`;
    return this.http.post<IdeaItem>(url, this.httpOptions)
  }

  removeUpvoteIdea(idea: IdeaItem) {
    const url = `${this.url}/ideas/${idea.id}/upvote`;
    return this.http.delete<IdeaItem>(url, this.httpOptions)
  }

  removeDownvoteIdea(idea: IdeaItem) {
    const url = `${this.url}/ideas/${idea.id}/downvote`;
    return this.http.delete<IdeaItem>(url, this.httpOptions)
  }


}
