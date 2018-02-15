import { Component, OnInit } from '@angular/core';
import { Customer } from '../Customer';
import { CustomerService } from '../customer.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ServerResponse } from '../ServerResponse';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
	customer: Customer;
	@ViewChild('customerForm') customerForm: any;
  	constructor(private customerService: CustomerService, public bsModalRef: BsModalRef) {
  		if(this.customer) this.customer = new Customer();
  	}

	onSubmit() {
		if (this.customerForm.valid) {
		    this.customerService.insertOrUpdate(this.customer).subscribe((data: ServerResponse) => {
				if(data.success){
					alert("Cliente atualizado com sucesso");
					this.bsModalRef.hide();
				}else{
					if(data.fail){
	        			alert("Ocorreu um erro em seu request. Entre em contato com o suporte.");
	        		}else if(data.error){
	        			alert("Ocorreu um erro em nosso servidor. Por favor, contate o suporte.");
	        		}else{
	        			alert("Não foi possivel realizar a ação. Tente novamente.")
	        		}
				}
			}, error => {
				console.log(error)
				alert("Ocorreu um erro em nosso servidor. Por favor, contate o suporte.");
			});
		}
	}
  ngOnInit() {
  }

}