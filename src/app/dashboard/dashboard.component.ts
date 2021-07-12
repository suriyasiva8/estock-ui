import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  form: any = {
    firstName: null,
    lastName:null,
    emailId: null,
    mobileNumber:null,
    password: null
  };

  companyCode="";
  compList:Object[]=[];
  latestStockPrice='';
  isKafkaError=false;
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
    
  }
  searchCompany(){
    this.apiService.findCompany(this.companyCode).subscribe(
      data => {
        console.log(data);
        this.compList=[data];
      },
      err => {
        console.log("Error while finding company details");
      }
    );
  }
  viewAllCompany(){
    this.apiService.findAllCompany().subscribe(
      data => {
        console.log(data);
        this.compList=data;
      },
      err => {
        console.log("Error while getting All company");
      }
    );
  }

  getLatestStockPrice(compData){
    if(compData){
      compData=compData.sort((a,b)=> (a.creationDate > b.creationDate ?-1 : 1));
      return JSON.stringify(compData[0].stockPrice);
    }else{
      return "";
    }
  }
  updateStockPrice(stockPrice){
    this.latestStockPrice=stockPrice;
  }

  addStockPrice(compData){
    if(this.latestStockPrice){
      console.log("stockPrice:"+this.latestStockPrice);
      this.isKafkaError=false;
      this.apiService.addStockPriceKafka(compData.companyCode,this.latestStockPrice).subscribe(
        data => {
          console.log(data);
        },
        err => {
          this.isKafkaError=true;
          console.log("Error while Adding Stock Price");
        }
      );
      
        console.log("came insided stock");
        this.apiService.addStockPrice(compData.companyCode,this.latestStockPrice).subscribe(
          data => {
            console.log(data);
          },
          err => {
            this.isKafkaError=true;
            console.log("Error while Adding Stock Price");
          }
        );
      
    }
  }

  deleteCompanyData(compData){
    this.apiService.deleteCompany(compData.companyCode).subscribe(
      data => {
        console.log(data);
        this.compList=this.compList.filter(item=>item['companyCode']!=compData.companyCode);
      },
      err => {
        console.log("Error while getting All company");
      }
    );
  }

}
