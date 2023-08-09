import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/models/Transaction.model';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-mini-statement',
  templateUrl: './mini-statement.component.html',
  styleUrls: ['./mini-statement.component.css']
})
export class MiniStatementComponent implements OnInit {

 

  customerid : any = localStorage.getItem("currId") ? localStorage.getItem("currId") : 0;
  transList : Array<any> = [];
  constructor(private customersService : CustomersService) { }

  ngOnInit(): void {
    console.log(this.customerid);
    this.customersService.getTransactions(this.customerid)
    .subscribe({
      next: (response) =>{
        this.transList = response;
      }
    })
    
  }

}
