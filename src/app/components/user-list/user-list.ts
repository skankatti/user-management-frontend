import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.html'
})
export class UserListComponent implements OnInit {

  users: any[] = [];
  role: string | null = '';
  loggedInEmail: string | null = '';
  loading: boolean = true;

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
  const updatedName = prompt('Enter new name', user.name);
  const updatedAddress = prompt('Enter new address', user.address);

  const updatedUser = {
    ...user,
    name: updatedName,
    address: updatedAddress
  };

  this.userService.updateUser(user.id, updatedUser).subscribe(() => {
    alert('User updated');
    this.loadUsers();
  });
}

}