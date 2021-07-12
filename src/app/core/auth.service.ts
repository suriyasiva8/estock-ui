import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const AUTH_API = environment.apiURL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'estock-users/login', {
      email,
      password
    }, httpOptions);
  }

  register(firstName:string,lastName: string, emailId: string, mobileNumber:string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'estock-users/users', {
      firstName,
      lastName,
      emailId,
      mobileNumber,
      password
    }, httpOptions);
  }

  generateOtp(emailId:string){

    return this.http.post(AUTH_API + 'estock-users/users/generateOtp',{
      emailId,
      undefined
    } ,httpOptions);
  }

  validateOtp(emailId,otp){
    return this.http.post(AUTH_API + 'estock-users/users/validateOtp',{
      emailId,
      otp
    },httpOptions);

  }
}