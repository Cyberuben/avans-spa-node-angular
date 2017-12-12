import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject"
import { HttpClient } from "@angular/common/http";

import { IResourceService } from "./resource.service";
import { DataStorageService } from "./data-storage.service";

import { Skill } from "../models/skill.model";

@Injectable()
export class SkillsService implements IResourceService {
	skills: Skill[];

	storage: DataStorageService<Skill>;

	skillsChanged = new Subject<Skill[]>();

	constructor(private httpClient: HttpClient) {
		this.storage = new DataStorageService<Skill>(httpClient, Skill.resourceKey);
	}

	create(skill: Skill) {
		return this.storage.create(skill);
	}

	get(id: string) {
		return this.storage.get(id)
		.map((skill: Skill) => {
			let instance = new Skill();
			instance.fromObject(skill);

			return instance;
		});
	}

	getAll() {
		return this.storage.getAll()
		.map((data) => {
			for(let key in data) {
				let jsonData = data[key];
				data[key] = new Skill();
				data[key].fromObject(jsonData);
			}

			this.skillsChanged.next(data);

			return data;
		});
	}

	update(skill: Skill) {
		return this.storage.update(skill);
	}

	remove(skill: Skill) {
		return this.storage.remove(skill);
	}
}