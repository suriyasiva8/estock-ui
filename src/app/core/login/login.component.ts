import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private route:Router,private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.navigateHomePage();
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe(
      data => {
        console.log("token 1s:"+JSON.stringify(data));
        console.log("token is:"+JSON.stringify(data.headers.get('token')));
        
        this.tokenStorage.saveToken(data.headers.get('token'));
        this.tokenStorage.saveUser(data.headers.get('userId'));

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.navigateHomePage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  navigateHomePage(): void {
    this.route.navigate(['/home'])
  }
}