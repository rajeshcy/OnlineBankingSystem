import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private router:Router) { }

  Adminloginform = new FormGroup({
    userid : new FormControl("",Validators.required),
    pwd : new FormControl("",[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ])
  });

  get UserId():FormControl{
    return this.Adminloginform.get('userid') as FormControl;
  }

  get password():FormControl{
    return this.Adminloginform.get('pwd') as FormControl;
  }

  public LoginAdmin(){
    if (this.Adminloginform.value.userid == "Admin" && this.Adminloginform.value.pwd == "Admin@123"){
      localStorage.setItem("AdminToken", "Admin");
      this.router.navigateByUrl('customers');
    }
    else{
      alert("Please enter valid UserId and Password");
    }
  }
  ngOnInit(): void {

  }

}
