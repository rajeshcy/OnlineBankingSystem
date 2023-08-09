import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  addCustomerRequest: any = {
    id : '',
    fullName : '',
    fatherName : '',
    gender : '',
    address : '',
    accNo :'',
    phoneNo :'',
    balance : '',
    dob : '',
    password : '',
    status:'',
    accounType : '',
    pan : ''
  };
  constructor(private customerService : CustomersService, private router : Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("AdminToken") == null){
      alert("You are not authorised to access this page");
      this.router.navigateByUrl('adminlogin');
    }
  }
  
  AddCustomer(){
    if (localStorage.getItem("AdminToken") != null){
      this.customerService.addCustomer(this.addCustomerRequest)
    .subscribe({
      next: (customer) =>{
        this.router.navigate(['customers']);
      }
    });
  }
  else{
    alert("You are not authorised to access this page");
    this.router.navigateByUrl('adminlogin');
  }
    }    
}
