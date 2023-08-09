import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersListComponent } from './components/Customers/customers-list/customers-list.component';

import { AddCustomerComponent } from './components/Customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/Customers/edit-customer/edit-customer.component';
import { CustomerLoginComponent } from './components/Customers/customer-login/customer-login.component';
import { IndividualCustomerComponent } from './components/Customers/individual-customer/individual-customer.component';
import { AddMoneyComponent } from './components/Customers/add-money/add-money.component';
import { WithdrawComponent } from './components/Customers/withdraw/withdraw.component';
import { MiniStatementComponent } from './components/Customers/mini-statement/mini-statement.component';
import { AdminLoginComponent } from './components/Customers/admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersListComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    CustomerLoginComponent,
    IndividualCustomerComponent,
    AddMoneyComponent,
    WithdrawComponent,
    MiniStatementComponent,
    AdminLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
