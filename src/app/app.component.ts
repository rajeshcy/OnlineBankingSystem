import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OnlineBankingSystem.UI';

  constructor(private router: Router){

  }

  public LogOut(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("AdminToken");
    this.router.navigateByUrl('');

  }
  }

  
