import { BaseModel } from "./base.model";

export class Employee extends BaseModel {
	public name: string;
	public email: string;
	public registration: number;

	constructor(name: string, email: string, registration: number) {
		super();
		
		this.name = name;
		this.email = email;
		this.registration = registration;
	}
}