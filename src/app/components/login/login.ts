import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {

  loginData = {
    email: '',
    password: ''
  };

constructor(private authService: AuthService, private router: Router) {}

  login() {
  this.authService.login(this.loginData).subscribe((res: any) => {
    this.authService.saveToken(res.token);
    this.router.navigate(['/dashboard']);
  });
}
}