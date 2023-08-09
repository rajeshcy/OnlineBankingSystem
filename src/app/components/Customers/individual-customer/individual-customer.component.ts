import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { CustomersService } from 'src/app/services/customers.service';


@Component({
  selector: 'app-individual-customer',
  templateUrl: './individual-customer.component.html',
  styleUrls: ['./individual-customer.component.css']
})
export class IndividualCustomerComponent implements OnInit {

  currentCustomer : any = {
    id : '',
    fullName : '',
    fatherName : '',
    Gender : '',
    address : '',
    accNo :'',
    phoneNo :'',
    balance : '',
    dob : new Date,
    password : '',
    status:'',
    accounType : '',
    pan : ''
  }

  addTransactionRequest : any = {
    transactionId : '',
    date : '',
    status : '',
    amount : '',
    customerId : ''
  }

  WithdrawTransactionRequest : any = {
    transactionId : '',
    date : '',
    status : '',
    amount : '',
    customerId : ''
  }

  EditBalance : any = {
    id : '',
    amount : ''
  }
  // transactionform = new FormGroup({
  //   dateofTransaction : new FormControl(Date.now),
  //   status : new FormControl(),
  //   amount : new FormControl(),
  //   customerId : new FormControl()
  // });
  
  jwtHelperService = new JwtHelperService();
  constructor(private customersService: CustomersService, private router:Router) { }

  userInfo : any
  ngOnInit(): void {
    const token = localStorage.getItem("access_token");
    this.currentCustomer = token != null ? this.jwtHelperService.decodeToken(token) : null;
    localStorage.setItem("currId",this.currentCustomer.Id);
    console.log(this.currentCustomer.gender);
    }

    public AddAmount(){
      this.EditBalance.id = this.currentCustomer.Id;
      this.addTransactionRequest.customerId = this.currentCustomer.Id;
      this.EditBalance.amount = this.addTransactionRequest.amount;
      this.customersService.AddMoney(this.currentCustomer.Id, this.addTransactionRequest.amount)
      .subscribe({
        next:(response) =>{
          // console.log(this.currentCustomer.Id);
          // console.log(this.addTransactionRequest.amount);
        }
      });
      this.addTransactionRequest.Status = "Add";
      this.customersService.postTransaction(this.addTransactionRequest)
      .subscribe(
        (trans : any) =>{
          
        }
      );
    
      localStorage.removeItem("access_token");
      this.customersService.loginUser([this.currentCustomer.accno,this.currentCustomer.password]).
      subscribe(
        res =>{
      this.customersService.setToken(res);
      // this.router.navigateByUrl('individualcustomer');
        }
      )
    }

    public WithdrawAmount(){
      this.EditBalance.id = this.currentCustomer.Id;
      this.WithdrawTransactionRequest.customerId = this.currentCustomer.Id;
      this.EditBalance.amount = this.WithdrawTransactionRequest.amount;
      this.customersService.WithdrawMoney(this.currentCustomer.Id, this.WithdrawTransactionRequest.amount)
      .subscribe({
        next:(response) =>{
          // console.log(this.currentCustomer.Id);
          // console.log(this.addTransactionRequest.amount);
        }
      });
      this.addTransactionRequest.Status = "Withdraw";
      this.customersService.postTransaction(this.WithdrawTransactionRequest)
      .subscribe(
        (trans : any) =>{
          
        }
      );
      localStorage.removeItem("access_token");
      this.customersService.loginUser([this.currentCustomer.accno,this.currentCustomer.password]).
      subscribe(
        res =>{
      this.customersService.setToken(res);
      this.router.navigateByUrl('individualcustomer');
        }
      )
     
    }
    updateCustomer(){
      this.customersService.updateCustomer(this.currentCustomer.id, this.currentCustomer)
      .subscribe({
        next:(response) =>{

        }
      });
    }
    user : any = {
      accno: '',
      password : ''
    }

    umesh(){
      this.currentCustomer.id = this.currentCustomer.id;
      this.currentCustomer.amount += this.addTransactionRequest.amount; 
    }
    loginSubmit(){

      const token = localStorage.getItem("access_token");
      this.currentCustomer = token != null ? this.jwtHelperService.decodeToken(token) : null;
      localStorage.setItem("currId",this.currentCustomer.Id);

      console.log(this.currentCustomer.accno);

      this.user.accno = this.currentCustomer.accno;
      this.user.password = this.currentCustomer.password;
      
      localStorage.removeItem("access_token");
      this.customersService.loginUser(this.user).
      subscribe(
        res =>{
      this.customersService.setToken(res);
        }
      )
    }
    
}
