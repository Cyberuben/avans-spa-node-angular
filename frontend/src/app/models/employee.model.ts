import { BaseModel } from "./base.model";

export class Employee extends BaseModel {
	public name: string;
	public email: string;
	public registration: number;

	static resourceKey = "employees";

	constructor() {
		super();
	}
}