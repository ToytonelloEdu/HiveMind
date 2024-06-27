import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IdeaItem } from '../../_services/rest-api/idea-item.type';
import { RestApiService } from '../../_services/rest-api/rest-api.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MarkdownComponent, MarkdownService } from 'ngx-markdown';


enum VoteState { none, upvote, downvote};

@Component({
  selector: 'app-idea-item',
  standalone: true,
  imports: [RouterLink, MarkdownComponent],
  templateUrl: './idea-item.component.html',
  styleUrl: './idea-item.component.scss'
})
export class IdeaItemComponent {
  @Input({required: true}) ideaItem: IdeaItem;
  mdService = inject(MarkdownService);
  

  ideaLink = "";
  restapi = inject(RestApiService);
  toastr = inject(ToastrService);
  markdown = "";

  ngOnInit() {
    this.ideaLink = "/todos/"+this.ideaItem?.id;
    if(this.ideaItem.isMarkDown) {
      this.markdown = this.mdService.parse(this.ideaItem.description).toString();
    }
  }

  VoteStateT = VoteState;
  voteState = VoteState.none;

  voteUploading = false;

  handleUpvote() {
    if(this.voteState !== VoteState.upvote && !this.voteUploading ){
      this.voteUploading = true;
      if(this.voteState === VoteState.downvote) {
        this.ideaItem.downvotes--;
      }
      this.voteState = VoteState.upvote;
      this.ideaItem.upvotes++;
      this.restapi.updateVotes(this.ideaItem).subscribe({
        error: (err) => {
          this.toastr.error("Could not upvote idea");
        },
        complete: () => {this.voteUploading = false;}
      });
    }
  }

  handleDownvote() {
    if(this.voteState !== VoteState.downvote && !this.voteUploading ) {
      this.voteUploading = true;
      if(this.voteState === VoteState.upvote) {
        this.ideaItem.upvotes--;
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
    
  }

}
