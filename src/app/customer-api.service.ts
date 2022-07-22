import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  readonly customerAPIUrl = "https://localhost:7271/api";

  constructor(private http:HttpClient) { }

  getCustomerList():Observable<any[]> {
    return this.http.get<any>(this.customerAPIUrl + '/customers');
  }

  addCustomer(data:any) {
    return this.http.post(this.customerAPIUrl + '/customers', data);
  }

  updateCustomer(id:number|string, data:any) {
    return this.http.put(this.customerAPIUrl + `/customers/${id}`, data);
  }

  deleteCustomer(id:number|string) {
    return this.http.delete(this.customerAPIUrl + `/customers/${id}`);
  }

  // Customer Types
  getCustomerTypesList():Observable<any[]> {
    return this.http.get<any>(this.customerAPIUrl + '/genders');
  }

  addCustomerTypes(data:any) {
    return this.http.post(this.customerAPIUrl + '/genders', data);
  }

  updateCustomerTypes(id:number|string, data:any) {
    return this.http.put(this.customerAPIUrl + `/genders/${id}`, data);
  }

  deleteCustomerTypes(id:number|string) {
    return this.http.delete(this.customerAPIUrl + `/genders/${id}`);
  }

  // Statuses
  getStatusList():Observable<any[]> {
    return this.http.get<any>(this.customerAPIUrl + '/status');
  }

  addStatus(data:any) {
    return this.http.post(this.customerAPIUrl + '/status', data);
  }

  updateStatus(id:number|string, data:any) {
    return this.http.put(this.customerAPIUrl + `/status/${id}`, data);
  }

  deleteStatus(id:number|string) {
    return this.http.delete(this.customerAPIUrl + `/status/${id}`);
  }
}
