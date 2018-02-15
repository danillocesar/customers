import { Injectable } from '@angular/core';
import { ServerResponse } from './ServerResponse';
import { Customer } from './Customer';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class CustomerService {
    private url = 'http://test.portalpostal.com.br:8083';

    constructor(private http: Http) { }
    
    getAll(): Observable<ServerResponse> {
        return this.http.get(this.url+"/secure/customers/")
            .map((response: Response) => <ServerResponse>response.json())
            .do(data => JSON.stringify(data))
            .catch(this.handleError);
    }
    delete(id: number): Observable<ServerResponse>{
    	return this.http.delete(this.url+"/secure/customer/"+id)
    			.map((response: Response) => <ServerResponse>response.json())
    			.do(data => JSON.stringify(data))
    			.catch(this.handleError);
    }
	insertOrUpdate(customer: Customer): Observable<ServerResponse>{
		if(customer.id == null){
			return this.http.post(this.url+"/secure/customer/", customer)
	      	.map((response: Response) => <ServerResponse>response.json())
	      	.do(data => JSON.stringify(data))
	      	.catch(this.handleError);
		}
		return this.http.put(this.url+"/secure/customer/", customer)
	      	.map((response: Response) => <ServerResponse>response.json())
	      	.do(data => JSON.stringify(data))
	      	.catch(this.handleError);
	}
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error);
    }
}



