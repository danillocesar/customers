import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { ListCustomersComponent } from './list-customers/list-customers.component';
import { CustomerService } from './customer.service';
import { CustomerComponent } from './customer/customer.component';


@NgModule({
  declarations: [
    AppComponent,
    ListCustomersComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
	HttpModule,
	FormsModule,
	ReactiveFormsModule,
	ModalModule.forRoot()
  ],
  entryComponents: [CustomerComponent],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
