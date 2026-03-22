import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user';
import { AuthService } from '../../services/auth';
import { UserFormComponent } from '../user-form/user-form';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: './user-list.html'
})
export class UserListComponent implements OnInit {

  users: any[] = [];
  role: string | null = '';
  loggedInEmail: string | null = '';
  loading: boolean = true;
  selectedUser: any = null;
  showForm: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.role = this.authService.getUserRole();
    this.loggedInEmail = this.authService.getUserEmail()
  }

  ngOnInit() {
    console.log('UserListComponent loaded');
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;

    this.userService.getUsers().subscribe((res: any) => {
      console.log("DATA:", res);

      this.users = res;
      this.loading = false;
    });
  }

  deleteUser(id: number) {
    if (confirm('Are you sure?')) {
      this.userService.deleteUser(id).subscribe(() => {
        alert('User deleted');
        this.loadUsers();   // refresh list
      });
    }
  }

  editUser(user: any) {
    this.selectedUser = user;
    this.showForm = true;
  }

  openCreateForm() {
    this.selectedUser = null;
    this.showForm = true;
  }

}