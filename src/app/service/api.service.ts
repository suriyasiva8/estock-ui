import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const AUTH_API = environment.apiURL2;
const FUNC_API = environment.funtionApp;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  registerCompany(compData): Observable<any> {
    const body=JSON.stringify(compData);
    return this.http.post(AUTH_API + 'api/v1.0/market/company/register',compData, httpOptions);
  }

  findCompany(companyCode): Observable<any> {
    return this.http.get(AUTH_API + 'api/v1.0/market/company/info/'+companyCode);
  }

  findAllCompany(): Observable<any> {
    return this.http.get(AUTH_API + 'api/v1.0/market/company/getall');
  }

  addStockPriceKafka(companyCode,stockPrice): Observable<any> {
   console.log("Company Code:"+companyCode);
    return this.http.post(FUNC_API + 'api/saveStock',{
      companyCode,
      stockPrice
    },httpOptions);
  }
  addStockPrice(companyCode,stockPrice): Observable<any> {

    return this.http.post(AUTH_API + 'api/v1.0/market/stock/add/'+companyCode,{
      stockPrice
    },httpOptions);
  }

  getStockPriceList(companyCode,startDate,endDate): Observable<any> {
    return this.http.get(AUTH_API + 'api/v1.0/market/stock/get/'+companyCode+'/'+startDate+'/'+endDate);
  }

  deleteCompany(companyCode): Observable<any> {
    return this.http.delete(AUTH_API + 'api/v1.0/market/company/delete/'+companyCode);
  }
}
