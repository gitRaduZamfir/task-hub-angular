import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  standalone:true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports:[MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatIconModule, MatButtonModule, MatCardModule],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  fb = inject(FormBuilder);
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  
  }

  

  ngOnInit(){
    if(this.authService.getUser()){
      this.router.navigate(['/tasks']);
      return;
    }
  }

    onLogin() {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    this.authService.login(username!, password!).subscribe(users => {
      if (users.length > 0) {
        this.router.navigate(['/tasks']);
      } else {
        alert('Invalid credentials');
      }
    });
  }
}

//TODO: de adaugat logout