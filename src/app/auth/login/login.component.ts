import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports:[MatFormFieldModule, ReactiveFormsModule],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  fb: FormBuilder;
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
     this.fb = fb;
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

//TODO: de rezolvat eroarea cu fb