import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IdeaItem } from '../../_services/rest-api/idea-item.type';
import { RestApiService } from '../../_services/rest-api/rest-api.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MarkdownComponent, MarkdownService } from 'ngx-markdown';
import { AuthService } from '../../_services/auth/auth.service';


export enum VoteState { none, upvote, downvote};

@Component({
  selector: 'app-idea-item',
  standalone: true,
  imports: [RouterLink, MarkdownComponent],
  templateUrl: './idea-item.component.html',
  styleUrl: './idea-item.component.scss'
})
export class IdeaItemComponent {
  @Input({required: true}) ideaItem: IdeaItem;
  @Output() voteClicked = new EventEmitter;

  ideaLink = "";
  restapi = inject(RestApiService);
  toastr = inject(ToastrService);
  authService = inject(AuthService);
  mdService = inject(MarkdownService);
  markdown = "";

  ngOnInit() {
    this.ideaLink = "/ideas/"+this.ideaItem?.id;
    const id = this.ideaItem.id as number;
    const user = this.authService.user() as string;
    this.restapi.getVote(id, user).subscribe({
      next: vote => {
        if(vote) {
          if(vote.upvote) {
            this.voteState = VoteState.upvote
          } else {
            this.voteState = VoteState.downvote
          }
        }
      }
    })
    if(this.ideaItem.isMarkDown) {
      this.markdown = this.mdService.parse(this.ideaItem.description).toString();
    }
  }

  VoteStateT = VoteState;
  voteState = VoteState.none;

  voteUploading = false;

  handleUpvote() {
    let change = false;
    if(this.voteState !== VoteState.upvote && !this.voteUploading ){
      this.voteUploading = true;
      if(this.voteState === VoteState.downvote) {
        this.ideaItem.downvotes--;
        change = true;
      }
      this.voteState = VoteState.upvote;
      this.ideaItem.upvotes++;
      this.restapi.updateVotes(this.ideaItem).subscribe({
        error: (err) => {
          this.toastr.error("Could not upvote idea");
        }
      });
      if(change){
        this.putVote(true);
      } else {
        this.postVote(true);
      }
    }
  }

  handleDownvote() {
    let change = false;
    if(this.voteState !== VoteState.downvote && !this.voteUploading ) {
      this.voteUploading = true;
      if(this.voteState === VoteState.upvote) {
        this.ideaItem.upvotes--;
        change = true;
      }
      this.voteState = VoteState.downvote;
      this.ideaItem.downvotes++;
      this.restapi.updateVotes(this.ideaItem).subscribe({
        error: (err) => {
          this.toastr.error("Could not downvote idea");
        },
        complete: () => {this.voteUploading = false;}
      });
    }
    if(change){
      this.putVote(false);
    } else {
      this.postVote(false);
    }
  }

  private putVote(upvote: boolean) {
    this.restapi.putVote({
      upvote: upvote,
      IdeaId: this.ideaItem.id as number,
      UserUsername: this.authService.user() as string
    }).subscribe({
      complete: () => { this.voteUploading = false; this.voteClicked.emit()}
    });
  }

  private postVote(upvote: boolean) {
    this.restapi.postVote({
      upvote: upvote,
      IdeaId: this.ideaItem.id as number,
      UserUsername: this.authService.user() as string
    }).subscribe({
      complete: () => { this.voteUploading = false; this.voteClicked.emit()}
    });
  }

}
