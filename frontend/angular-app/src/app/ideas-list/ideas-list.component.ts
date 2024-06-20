import { Component } from '@angular/core';
import { IdeaItem } from '../_services/rest-api/idea-item.type';

@Component({
  selector: 'app-ideas-list',
  standalone: true,
  imports: [],
  templateUrl: './ideas-list.component.html',
  styleUrl: './ideas-list.component.scss'
})
export class IdeasListComponent {


  ideas: IdeaItem[] = []

}
