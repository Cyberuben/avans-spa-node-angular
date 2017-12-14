import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

import { IResourceService } from "./resource.service";
import { DataStorageService } from "./data-storage.service";

import { Diploma } from "../models/diploma.model";
import { environment } from "../../environments/environment";

@Injectable()
export class DiplomasService implements IResourceService {
	private diplomas: object;

	storage: DataStorageService<Diploma>;

	diplomasChanged = new Subject<Diploma[]>();
	diplomaSelected = new Subject<Diploma>();

	constructor(private httpClient: HttpClient) {
		this.diplomas = {};
		this.storage = new DataStorageService<Diploma>(httpClient, Diploma.resourceKey);
	}

	create(diploma: Diploma) {
		return this.storage.create(diploma)
		.map((diploma: Diploma) => {
			let instance = new Diploma();
			instance.fromObject(diploma);

			this.diplomas[instance._id] = instance;
			this.notifyChange();

			return instance;
		});
	}

	get(id: string, reload = false) {
		if(this.diplomas.hasOwnProperty(id) && !reload) {
			return Observable.of(this.diplomas[id]);
		}

		return this.storage.get(id)
		.map((diploma: Diploma) => {
			let instance = new Diploma();
			instance.fromObject(diploma);

			this.diplomas[instance._id] = instance;
			this.notifyChange();

			return instance;
		});
	}

	getAll() {
		return this.storage.getAll()
		.map((data) => {
			this.diplomas = {};

			for(let key in data) {
				let jsonData = data[key];
				data[key] = new Diploma();
				data[key].fromObject(jsonData);

				this.diplomas[data[key]._id] = data[key];
			}

			this.notifyChange();

			return data;
		});
	}

	getSkills(id: string) {
		return this.httpClient.get<object[]>(`${environment.apiUrl}/diplomas/${id}/skills`);
	}

	addSkill(id: string, skillId: string) {
		return this.httpClient.post(`${environment.apiUrl}/diplomas/${id}/skills`, {
			id: skillId
		});
	}

	removeSkill(id: string, skillId: string) {
		return this.httpClient.delete(`${environment.apiUrl}/diplomas/${id}/skills/${skillId}`);
	}

	update(diploma: Diploma) {
		return this.storage.update(diploma)
		.map((diploma: Diploma) => {
			let instance = this.diplomas[diploma._id] || new Diploma();
			instance.fromObject(diploma);

			this.diplomas[instance._id] = instance;
			this.notifyChange();

			return instance;
		});
	}

	remove(diploma: Diploma) {
		return this.storage.remove(diploma)
		.map((_diploma: Diploma) => {
			delete this.diplomas[diploma._id];
			this.notifyChange();

			return diploma;
		});
	}

	notifyChange() {
		this.diplomasChanged.next(Object.values(this.diplomas));
	}
}