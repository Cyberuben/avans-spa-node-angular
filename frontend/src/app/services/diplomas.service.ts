import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject"
import { HttpClient } from "@angular/common/http";

import { IResourceService } from "./resource.service";
import { DataStorageService } from "./data-storage.service";

import { Diploma } from "../models/diploma.model";

@Injectable()
export class DiplomasService implements IResourceService {
	diplomas: Diploma[];

	storage: DataStorageService<Diploma>;

	diplomasChanged = new Subject<Diploma[]>();

	constructor(private httpClient: HttpClient) {
		this.storage = new DataStorageService<Diploma>(httpClient, Diploma.resourceKey);
	}

	create(diploma: Diploma) {
		return this.storage.create(diploma);
	}

	get(id: string) {
		return this.storage.get(id)
		.map((diploma: Diploma) => {
			let instance = new Diploma();
			instance.fromObject(diploma);

			return instance;
		});
	}

	getAll() {
		return this.storage.getAll()
		.map((data) => {
			for(let key in data) {
				let jsonData = data[key];
				data[key] = new Diploma();
				data[key].fromObject(jsonData);
			}

			this.diplomasChanged.next(data);

			return data;
		});
	}

	update(diploma: Diploma) {
		return this.storage.update(diploma);
	}

	remove(diploma: Diploma) {
		return this.storage.remove(diploma);
	}
}