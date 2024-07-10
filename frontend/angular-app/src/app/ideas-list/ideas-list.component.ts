import { Component, Signal, computed, inject, signal } from '@angular/core';
import { IdeaItem } from '../_services/rest-api/idea-item.type';
import { RestApiService } from '../_services/rest-api/rest-api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IdeaItemComponent } from './idea-item/idea-item.component';
import { NgFor } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

type fetchType = "main" | "popular" | "unpopular";

@Component({
  selector: 'app-ideas-list',
  standalone: true,
  imports: [NgxPaginationModule, IdeaItemComponent],
  templateUrl: './ideas-list.component.html',
  styleUrl: './ideas-list.component.scss'
})
export class IdeasListComponent {

  restapi = inject(RestApiService);
  toastr = inject(ToastrService);
  router = inject(Router);

  ideas: IdeaItem[] = []
  totalLength: any;
  page: number = 1;

  currentMode: fetchType = "main";

  handleMain() {
    if(this.currentMode !== "main") {
      this.currentMode = "main";
      this.fetchIdeas();
    }
  }

  handlePopular() {
      if(this.currentMode !== "popular") {
        this.currentMode = "popular";
        this.fetchIdeas();
      }
  }

  handleUnpopular() {
    if(this.currentMode !== "unpopular") {
      this.currentMode = "unpopular";
      this.fetchIdeas();
    }
  }

  ngOnInit() {
    this.fetchIdeas();
  }

  fetchIdeas() {
    switch (this.currentMode) {
      case "main":
        return this.fetchMain();
      case "popular":
        return this.fetchPopular();
      case "unpopular":
        return this.fetchUnpopular();
      default:
        break;
    }
  }

  fetchMain() {
    this.restapi.getIdeas().subscribe({
      next: (data) => {
        this.ideas = data;
        this.totalLength = this.ideas.length
      },
      error: (err) => {
        this.handleFetchError(err);
      }
    })
  }

  fetchPopular() {
    this.restapi.getPopularIdeas().subscribe({
      next: (data) => {
        this.ideas = data;
        this.totalLength = this.ideas.length
      },
      error: (err) => {
        this.handleFetchError(err);
      }
    })
  }

  fetchUnpopular() {
    this.restapi.getUnpopularIdeas().subscribe({
      next: (data) => {
        this.ideas = data;
        this.totalLength = this.ideas.length
      },
      error: (err) => {
        this.handleFetchError(err);
      }
    })
  }

  private handleFetchError(err: any) {
    if (err.status === 401) {
      this.toastr.error("Your access token appears to be invalid. Login again", "Token expired");
      this.router.navigateByUrl("/login");
    } else {
      this.toastr.error(err.message, err.statusText);
    }
  }

}
