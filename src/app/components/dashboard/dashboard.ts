import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { UserListComponent } from "../user-list/user-list";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, UserListComponent],
  templateUrl: './dashboard.html'
})
export class DashboardComponent {

  role: string | null = '';
  showUsers: boolean = false;   //control flag

  constructor(private authService: AuthService,
    private router: Router
  ) {
    this.role = this.authService.getUserRole();

    
  }
viewUsers() {
    this.showUsers = true;   //show list on click
  }
}
