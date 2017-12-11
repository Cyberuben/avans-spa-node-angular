import { BaseModel } from "./base.model";

export class Diploma extends BaseModel {
	public name: string;
	public type: string;

	constructor(name: string, type: string) {
		super();
		
		this.name = name;
		this.type = type;
	}
}