import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject"
import { HttpClient } from "@angular/common/http";

import { IResourceService } from "./resource.service";
import { DataStorageService } from "./data-storage.service";

import { Employee } from "../models/employee.model";

@Injectable()
export class EmployeesService implements IResourceService {
	employees: Employee[];

	storage: DataStorageService<Employee>;

	employeesChanged = new Subject<Employee[]>();

	constructor(private httpClient: HttpClient) {
		this.storage = new DataStorageService<Employee>(httpClient, Employee.resourceKey);
	}

	create(employee: Employee) {
		return this.storage.create(employee);
	}

	get(id: string) {
		return this.storage.get(id)
		.map((employee: Employee) => {
			let instance = new Employee();
			instance.fromObject(employee);

			return instance;
		});
	}

	getAll() {
		return this.storage.getAll()
		.map((data) => {
			for(let key in data) {
				let jsonData = data[key];
				data[key] = new Employee();
				data[key].fromObject(jsonData);
			}

			this.employeesChanged.next(data);

			return data;
		});
	}

	update(employee: Employee) {
		return this.storage.update(employee);
	}

	remove(employee: Employee) {
		return this.storage.remove(employee);
	}
}