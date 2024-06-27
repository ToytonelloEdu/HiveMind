import { Component, inject } from '@angular/core';
import { IdeasListComponent } from '../ideas-list/ideas-list.component';
import { AuthService } from '../_services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [IdeasListComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  
}
