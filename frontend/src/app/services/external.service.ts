import { BaseModel } from "../models/base.model";

export interface ExternalService {
	items: BaseModel[];

	// CRUD
	// Create
	create(model: BaseModel): Promise<BaseModel>;

	// Read
	get(id: string): Promise<BaseModel>;
	getAll(): Promise<BaseModel[]>;

	// Update
	update(model: BaseModel): Promise<BaseModel>;

	// Delete
	remove(model: BaseModel): Promise<BaseModel>;
}
