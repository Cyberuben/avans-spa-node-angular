import { BaseModel } from "./base.model";

export class Skill extends BaseModel {
	public name: string;

	constructor(name: string) {
		super();
		
		this.name = name;
	}
}