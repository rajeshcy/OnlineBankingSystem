import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Transaction } from '../models/Transaction.model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private baseApiUrl:string = environment.baseapiUrl;

  currentUser : BehaviorSubject<any> = new BehaviorSubject(null);
  // private url = "Customers";
  jwtHelperService = new JwtHelperService();

  constructor(private http:HttpClient) { }

  public getAllCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.baseApiUrl+'/api/Customers');
  }

  public getTransactions(customerId?:string){
    return this.http.get<any[]>('https://localhost:7165/api/Trans/GetTransById?id='+customerId);
  }

  public addCustomer(addCustomerRequest: any): Observable<Customer>{
    addCustomerRequest.id = 0;
    return this.http.post<Customer>(this.baseApiUrl+'/api/Customers',addCustomerRequest);
  }

  public getCustomer(id:string): Observable<Customer>{
    return this.http.get<Customer>(this.baseApiUrl+'/api/Customers/'+id);
  }

  public updateCustomer(id:string, updateCustomerRequest: Customer):Observable<Customer>{
    return this.http.put<Customer>(this.baseApiUrl+'/api/Customers/'+id,updateCustomerRequest);
  }

  public deleteCustomer(id:string):Observable<Customer>{
    return this.http.delete<Customer>(this.baseApiUrl+'/api/Customers/'+id);
  }

  public postTransaction(addtrRequest : any): Observable<any>{
    addtrRequest.transactionId = 0;
    addtrRequest.date = new Date() 
    return this.http.post<Transaction>('https://localhost:7165/api/Trans', addtrRequest);
  }

  public AddMoney(id:number,amount:number): Observable<any>{
    console.log(id);
    console.log(amount);
    return this.http.post(this.baseApiUrl+'/api/Customers/AddMoney?id='+id+'&amount='+amount,{
      // id : id,
      // amount : 500
    },
    {
      responseType:'text',
    })
  }
  
  public WithdrawMoney(id:number,amount:number): Observable<any>{
    console.log(id);
    console.log(amount);
    return this.http.post(this.baseApiUrl+'/api/Customers/WithdrawMoney?id='+id+'&amount='+amount,{
      // id : id,
      // amount : 500
    },
    {
      responseType:'text',
    })
  }
  loginUser(loginInfo:Array<any>){
    return this.http.post(this.baseApiUrl+'/api/Customers/CustomerLogin',{
      accno : loginInfo[0],
      pwd : loginInfo[1]
    },
    {
      responseType:'text',
    });
  }

  setToken(token:string){
    localStorage.setItem("access_token", token);
    this.loadcurrentUser();
  }

  loadcurrentUser():any {
    const token = localStorage.getItem("access_token");
    const userInfo = token != null ? this.jwtHelperService.decodeToken(token) : null;
    const data = userInfo? {
    id:userInfo.id,
    fullname : userInfo.fullname,
    fathername : userInfo.fathername, 
    gender : userInfo.gender,
    address : userInfo.address,
    accno : userInfo.accno,
    phoneno : userInfo.phoneno,
    balance : userInfo.balance,
    dob : userInfo.dob,
    accounType : userInfo.accounType,
    pan : userInfo.pan
   }: null;
   this.currentUser.next(data);
  }

  isLoggedin(): boolean{
    return localStorage.getItem("access_token") ? true: false;
  }
}
