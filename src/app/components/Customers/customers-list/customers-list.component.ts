import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  customers : any = [];
  constructor(private customersService: CustomersService, private router: Router) { }

  user:any = [];
  ngOnInit(): void {
    if (localStorage.getItem("AdminToken") != null){
      this.customersService.getAllCustomers().subscribe
    ({
      next:(data) => {
        this.customers = data;
      }
    });
    }
    else{
      alert("You are not authorised to access this page");
      this.router.navigateByUrl('adminlogin');
    }
  }

}
