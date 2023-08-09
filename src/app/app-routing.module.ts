import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersListComponent } from './components/Customers/customers-list/customers-list.component';
import { AddCustomerComponent } from './components/Customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/Customers/edit-customer/edit-customer.component';
import { CustomerLoginComponent } from './components/Customers/customer-login/customer-login.component';
import { IndividualCustomerComponent } from './components/Customers/individual-customer/individual-customer.component';
import { AuthGuard } from './services/auth.guard';
import { AddMoneyComponent } from './components/Customers/add-money/add-money.component';
import { WithdrawComponent } from './components/Customers/withdraw/withdraw.component';
import { MiniStatementComponent } from './components/Customers/mini-statement/mini-statement.component';
import { AdminLoginComponent } from './components/Customers/admin-login/admin-login.component';

const routes: Routes = [
  {
    path:'',
    component : CustomerLoginComponent
  },
  {
    path:'login',
    component : CustomerLoginComponent
  },
  {
    path : 'customers',
    component : CustomersListComponent
  },
  {
    path : 'customers/add',
    component : AddCustomerComponent
  },
  {
    path : 'withdramoney',
    component : WithdrawComponent
  },
  {
    path : 'addmoney',
    component : AddMoneyComponent
  },
  {
    path : 'customers/edit/:id',
    component : EditCustomerComponent
  },
  {
    path : 'individualcustomer',
    component : IndividualCustomerComponent,
    canActivate :[AuthGuard]
  },
  {
    path : 'ministatement',
    component : MiniStatementComponent,
  },
  {
    path : 'adminlogin',
    component : AdminLoginComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
