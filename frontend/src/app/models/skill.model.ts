import { BaseModel } from "./base.model";

export class Skill extends BaseModel {
	public name: string;

	static resourceKey = "skills";

	constructor() {
		super();
	}
}