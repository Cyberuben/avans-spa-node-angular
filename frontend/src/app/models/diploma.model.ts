import { BaseModel } from "./base.model";

export class Diploma extends BaseModel {
	public name: string;
	public type: string;

	static resourceKey = "diplomas";

	constructor() {
		super();
	}
}