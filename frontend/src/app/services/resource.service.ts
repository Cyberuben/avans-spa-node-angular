import { Observable } from "rxjs/Observable";

import { BaseModel } from "../models/base.model";
import { DataStorageService } from "./data-storage.service";

export interface IResourceService {
	storage: DataStorageService<BaseModel>;

	// CRUD
	// Create
	create(model: BaseModel): Observable<BaseModel>;

	// Read
	get(id: string): Observable<BaseModel>;
	getAll(): Observable<BaseModel[]>;

	// Update
	update(model: BaseModel): Observable<BaseModel>;

	// Delete
	remove(model: BaseModel): Observable<BaseModel>;
}
