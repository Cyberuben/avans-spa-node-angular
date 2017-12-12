export abstract class BaseModel {
	public _id: string;
	public __v: number;

	static resourceKey: string;

	fromObject(data: object) {
		for(var key in data) {
			this[key] = data[key];
		}
	}

	constructor() {}
}