import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {

  constructor(private customersService : CustomersService, private router: Router) { }

  ngOnInit(): void {
  }
  loginform = new FormGroup({
    accno : new FormControl("",Validators.required),
    pwd : new FormControl("",[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ])
  });

  isuservalid :boolean = false;
  
  get AccNo():FormControl{
    return this.loginform.get('accno') as FormControl;
  }

  get password():FormControl{
    return this.loginform.get('pwd') as FormControl;
  }
  loginSubmit(){
   return this.customersService.loginUser([this.loginform.value.accno,this.loginform.value.pwd])
   .subscribe(res =>{
    if (res == 'Failure'){
      this.isuservalid = false;
      alert('Login Failed');
    }
    else{
      this.isuservalid = true;
      this.customersService.setToken(res);
      this.router.navigateByUrl('individualcustomer');
    }
   });
  }
}
