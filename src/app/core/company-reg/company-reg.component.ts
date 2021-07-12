import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-company-reg',
  templateUrl: './company-reg.component.html',
  styleUrls: ['./company-reg.component.css']
})
export class CompanyRegComponent implements OnInit {
  isSuccessful=false;
  isVerified=false;
  otp="";
  isInvalidOtp=false;
  isCompanyCodeUnique=false;
  constructor(private apiService:ApiService,private authService:AuthService,private tokenService:TokenStorageService) { }

  ngOnInit(): void {
    this.authService.generateOtp(this.tokenService.getUser()).subscribe();
  }

  register(compData){
    if(compData.form.valid){
    console.log(compData.value.turnover);
    this.apiService.registerCompany(compData.value).subscribe(
      data => {
        console.log("headers:"+data.headers.status);
        console.log(data);
        this.isSuccessful=true;
        this.isCompanyCodeUnique=false;
        compData.resetForm();
      },
      err => {
        if(err.status===208){
          this.isCompanyCodeUnique=true;
        }
        console.log("Error with registration");
        this.isSuccessful=false;
      }
    );
    }
  }

  validateOtp(){
    console.log(this.otp);
    
        this.authService.validateOtp(this.tokenService.getUser,this.otp).subscribe(
          data => {
            console.log(data);
            this.isVerified=true;
          },
          err => {
            console.log("Error with registration");
            this.isInvalidOtp=true;
          }
        );
      
    
    
  }

}
