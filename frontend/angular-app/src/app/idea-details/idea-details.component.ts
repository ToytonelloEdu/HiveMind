import { Component, inject } from '@angular/core';
import { IdeaItem } from '../_services/rest-api/idea-item.type';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../_services/rest-api/rest-api.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth/auth.service';
import { MarkdownService } from 'ngx-markdown';
import { VoteState } from '../ideas-list/idea-item/idea-item.component';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-idea-details',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './idea-details.component.html',
  styleUrl: './idea-details.component.scss'
})
export class IdeaDetailsComponent {
  constructor(private route:ActivatedRoute){}
  id: number = 0;
  ideaItem: IdeaItem;
  render = false;

  commentSubmitted = false;

  commentForm = new FormGroup({
    comment: new FormControl('', [Validators.required])
  })

  restapi = inject(RestApiService);
  toastr = inject(ToastrService);
  router = inject(Router)
  authService = inject(AuthService);
  mdService = inject(MarkdownService);
  markdown = "";

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.restapi.getIdeaById(this.id).subscribe({
      next: (idea)  => {
        if(idea){
          this.ideaItem = idea
          const user = this.authService.user() as string;
          this.restapi.getVote(this.id, user).subscribe({
            next: vote => {
              if(vote) {
                if(vote.upvote) {
                  this.voteState = VoteState.upvote
                } else {
                  this.voteState = VoteState.downvote
                }
              }
            },
            error: err => {
              console.log(err); 
            },
            complete: () => {
              this.render = true;
            }
          });
          if(this.ideaItem.isMarkDown) {
            this.markdown = this.mdService.parse(this.ideaItem.description).toString();
          }          
        } else {
          this.toastr.error("Returning to the homepage", "Idea not found!")
          this.router.navigateByUrl("/home");
        }
      },
      error: err => {
        console.log(err);
      }
    })
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
      complete: () => { this.voteUploading = false; }
    });
  }

  private postVote(upvote: boolean) {
    this.restapi.postVote({
      upvote: upvote,
      IdeaId: this.ideaItem.id as number,
      UserUsername: this.authService.user() as string
    }).subscribe({
      complete: () => { this.voteUploading = false; }
    });
  }



  handleCommentSubmit() {
    this.commentSubmitted = true;
    if(this.commentForm.invalid) {
      this.toastr.error("The provided data is invalid!", "ERROR: Invalid data");
    } else {
      this.restapi.postComment({
        comment: this.commentForm.value.comment as string,
        IdeaId: this.id,
        UserUsername: this.authService.user() as string
      }).subscribe({
        next: result => {
          this.toastr.success(`${result.comment}`, "Comment added successfully!");
          this.ideaItem.commentItems?.unshift(result);
          this.commentSubmitted = false;
          this.commentForm.setValue({comment: ""});
        },
        error: err => {
          if (err.status === 401) {
            this.toastr.error("Your access token appears to be invalid. Login again", "Token expired");
            this.router.navigateByUrl("/login");
          } else {
            this.toastr.error(err.message, err.statusText);
          }
        },
        complete: () => {
          this.commentForm.value.comment = '';
        }
      })
    }

  }

}
