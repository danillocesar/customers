import { Customer } from './Customer';
export class ServerResponse {
	data: Customer;
	message: string;
	status: string;
	code: string;
	error: boolean;
	success: boolean;
	fail: boolean;
}