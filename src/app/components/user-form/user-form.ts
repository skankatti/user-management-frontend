import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.css']
})
export class UserFormComponent {

  @Input() user: any = null;   // for edit
  @Output() refresh = new EventEmitter<void>();   // notify parent

  formData: any = {
    name: '',
    email: '',
    address: '',
    password: '',
    role: 'USER'
  };

  constructor(private userService: UserService) {}

  ngOnInit() {
    if (this.user) {
      this.formData = { ...this.user };
    }
  }

  submit() {
    if (this.user) {
      // EDIT USER
      this.userService.updateUser(this.user.id, this.formData)
        .subscribe({
          next: () => {
            alert('User updated successfully');
            this.refresh.emit();
            this.resetForm();
          },
          error: (err) => console.error(err)
        });

    } else {
      // CREATE USER
      this.userService.createUser(this.formData)
        .subscribe({
          next: () => {
            alert('User created successfully');
            this.refresh.emit();
            this.resetForm();
          },
          error: (err) => console.error(err)
        });
    }
  }

  resetForm() {
    this.formData = {
      name: '',
      email: '',
      address: '',
      password: '',
      role: ''
    };
  }
}