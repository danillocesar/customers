import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ServerResponse } from '../ServerResponse';
import { Customer } from '../Customer';
import { CustomerService } from '../customer.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CustomerComponent } from '../customer/customer.component';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {
	response: ServerResponse;
	customers: Customer[];
	bsModalRef: BsModalRef;
	
	constructor(private customerService: CustomerService, private modalService: BsModalService) { }
	deleteCustomer(customerId: number): void{
		this.customerService.delete(customerId).subscribe((data: ServerResponse) => {
			console.log(data);
			if(data.success){
				alert("Cliente deletado com sucesso");
				this.getAllCustomer();
			}else{
				if(data.fail){
        			alert("Ocorreu um erro em seu request. Entre em contato com o suporte.");
        		}else if(data.error){
        			alert("Ocorreu um erro em nosso servidor. Por favor, contate o suporte.");
        		}else{
        			alert("Não foi possivel realizar a ação. Tente novamente.")
        		}
			}
		}, error => console.log(error));
	}
	getAllCustomer(): void{
		this.customerService.getAll()
            .subscribe((data: ServerResponse) => {
            	this.response = data;
            	if(this.response.success){
	            	this.customers = this.response.data["customerList"];
            	}else{
            		if(this.response.fail){
            			alert("Ocorreu um erro em sua consulta. Entre em contato com o suporte.");
            		}else if(this.response.error){
            			alert("Ocorreu um erro em nosso servidor. Por favor, contate o suporte.");
            		}else{
            			alert("Não foi possivel realizar a consulta. Tente novamente.")
            		}
            	}
        	}, 
            error => console.log(error));
	}
	openModal(customer) {
		if(!customer) customer = {};
		const initialState = {
      	title: 'Cliente',
      	closeBtnName: 'Fechar',
      	customer: customer
    	};
    	this.bsModalRef = this.modalService.show(CustomerComponent, {class: 'modal-lg', initialState});
    	this.modalService.onHidden.subscribe((reason: string) => { this.getAllCustomer();});
  	}
	ngOnInit() {
		this.getAllCustomer();
	}
}
