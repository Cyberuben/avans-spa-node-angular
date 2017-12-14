import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

import { IResourceService } from "./resource.service";
import { DataStorageService } from "./data-storage.service";

import { Skill } from "../models/skill.model";

@Injectable()
export class SkillsService implements IResourceService {
	private skills: object;

	storage: DataStorageService<Skill>;

	skillsChanged = new Subject<Skill[]>();
	skillSelected = new Subject<Skill>();

	constructor(private httpClient: HttpClient) {
		this.skills = {};
		this.storage = new DataStorageService<Skill>(httpClient, Skill.resourceKey);
	}

	create(skill: Skill) {
		return this.storage.create(skill)
		.map((skill: Skill) => {
			let instance = new Skill();
			instance.fromObject(skill);

			this.skills[instance._id] = instance;
			this.notifyChange();

			return instance;
		});
	}

	get(id: string, reload = false) {
		if(this.skills.hasOwnProperty(id) && !reload) {
			return Observable.of(this.skills[id]);
		}

		return this.storage.get(id)
		.map((skill: Skill) => {
			let instance = new Skill();
			instance.fromObject(skill);

			this.skills[instance._id] = instance;
			this.notifyChange();

			return instance;
		});
	}

	getAll() {
		return this.storage.getAll()
		.map((data) => {
			this.skills = {};

			for(let key in data) {
				let jsonData = data[key];
				data[key] = new Skill();
				data[key].fromObject(jsonData);

				this.skills[data[key]._id] = data[key];
			}

			this.notifyChange();

			return data;
		});
	}

	update(skill: Skill) {
		return this.storage.update(skill)
		.map((skill: Skill) => {
			let instance = this.skills[skill._id] || new Skill();
			instance.fromObject(skill);

			this.skills[instance._id] = instance;
			this.notifyChange();

			return instance;
		});
	}

	remove(skill: Skill) {
		return this.storage.remove(skill)
		.map((_skill: Skill) => {
			delete this.skills[skill._id];
			this.notifyChange();

			return skill;
		});
	}

	notifyChange() {
		this.skillsChanged.next(Object.values(this.skills));
	}
}