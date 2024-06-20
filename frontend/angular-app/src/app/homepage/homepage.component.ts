import { Component } from '@angular/core';
import { IdeasListComponent } from '../ideas-list/ideas-list.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [IdeasListComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {


    
}
