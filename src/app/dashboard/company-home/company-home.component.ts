import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.css']
})
export class CompanyHomeComponent implements OnInit {

  companyCode="";
  companyDtl:object;
  minStockPrice=0;
  maxStockPrice=0;
  avgStockPrice=0;
  stockPriceList:object[]=[];
  constructor(private apiService:ApiService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.companyCode = this.route.snapshot.paramMap.get('companyCode');
    this.getCompanyData();
  }

  getCompanyData(){
    this.apiService.findCompany(this.companyCode).subscribe(
      data => {
        console.log(data);
        this.companyDtl=data;
        let stockPriceData=data.companyStockPriceList;
        this.calculateStockPrice(stockPriceData);
        

      },
      err => {
        console.log("Error while finding company details");
      }
    );
  }



  calculateStockPrice(stockPriceData){
    if(stockPriceData){
      this.stockPriceList=stockPriceData;
      let format=stockPriceData.sort((a,b)=> (a.stockPrice > b.stockPrice ?-1 : 1));
      this.avgStockPrice=0;
      if(stockPriceData.length<2){
        this.minStockPrice=format[0].stockPrice;
        this.maxStockPrice=format[0].stockPrice;
        this.avgStockPrice=format[0].stockPrice;
      }else{
        this.maxStockPrice=format[0].stockPrice;
        this.minStockPrice=format[stockPriceData.length-1].stockPrice;
        stockPriceData.forEach(element => {
          this.avgStockPrice=this.avgStockPrice+element.stockPrice;
        });
        this.avgStockPrice=parseFloat((this.avgStockPrice/stockPriceData.length).toFixed(2));
      }
    }
  
  }

  filterByDate(filterForm){
    if(filterForm.value.startDate && filterForm.value.endDate){
      this.apiService.getStockPriceList(this.companyCode,filterForm.value.startDate,filterForm.value.endDate).subscribe(
        data => {
          console.log(data);
          this.stockPriceList=data;
          this.calculateStockPrice(this.stockPriceList);
        },
        err => {
          console.log("Error while finding company details");
        }
      );

    }
    
  }

  getDate(stockData){
   // let data=JSON.stringify(stockData);
    const dateObject = new Date(stockData.creationDate);
    const humanDateFormat = dateObject.toLocaleString();
    var dateTime=humanDateFormat.split(", ")
    return dateTime;
  }

}

