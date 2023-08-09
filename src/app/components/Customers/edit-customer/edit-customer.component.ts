import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerDetails : any = {
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
  }
  constructor(private route :ActivatedRoute, private customersSerive : CustomersService,private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("AdminToken") != null){
      this.route.paramMap.subscribe({
        next : (params) =>{
         const id =  params.get('id');
         if (id){
          this.customersSerive.getCustomer(id)
          .subscribe({
            next:(response) => {
              this.customerDetails = response;
            }
          });
         }
        }
      })
    }
    else{
      alert("You are not authorised to access this page");
      this.router.navigateByUrl('adminlogin');
    }
   
  }

  updateCustomer(){
    this.customersSerive.updateCustomer(this.customerDetails.id, this.customerDetails)
    .subscribe({
      next:(response) =>{
        this.router.navigate(['customers']);
      }
    });
  }
  deleteCustomer(id:string){
    this.customersSerive.deleteCustomer(id)
    .subscribe({
      next: (response) =>{
        this.router.navigate(['customers']);
      }
    });
  }
}
