import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

import { IResourceService } from "./resource.service";
import { DataStorageService } from "./data-storage.service";

import { Employee } from "../models/employee.model";
import { environment } from "../../environments/environment";

@Injectable()
export class EmployeesService implements IResourceService {
	private employees: object;

	storage: DataStorageService<Employee>;

	employeesChanged = new Subject<Employee[]>();
	employeeSelected = new Subject<Employee>();

	constructor(private httpClient: HttpClient) {
		this.employees = {};
		this.storage = new DataStorageService<Employee>(httpClient, Employee.resourceKey);
	}

	create(employee: Employee) {
		return this.storage.create(employee)
		.map((employee: Employee) => {
			let instance = new Employee();
			instance.fromObject(employee);

			this.employees[instance._id] = instance;
			this.notifyChange();

			return instance;
		});
	}

	get(id: string, reload = false) {
		if(this.employees.hasOwnProperty(id) && !reload) {
			return Observable.of(this.employees[id]);
		}

		return this.storage.get(id)
		.map((employee: Employee) => {
			let instance = new Employee();
			instance.fromObject(employee);

			this.employees[instance._id] = instance;
			this.notifyChange();

			return instance;
		});
	}

	getAll() {
		return this.storage.getAll()
		.map((data) => {
			this.employees = {};

			for(let key in data) {
				let jsonData = data[key];
				data[key] = new Employee();
				data[key].fromObject(jsonData);

				this.employees[data[key]._id] = data[key];
			}

			this.notifyChange();

			return data;
		});
	}

	getDiplomas(id: string) {
		return this.httpClient.get(`${environment.apiUrl}/employees/${id}/diplomas`);
	}

	update(employee: Employee) {
		return this.storage.update(employee)
		.map((employee: Employee) => {
			let instance = this.employees[employee._id] || new Employee();
			instance.fromObject(employee);

			this.employees[instance._id] = instance;
			this.notifyChange();

			return instance;
		});
	}

	remove(employee: Employee) {
		return this.storage.remove(employee)
		.map((_employee: Employee) => {
			delete this.employees[employee._id];
			this.notifyChange();

			return employee;
		});
	}

	notifyChange() {
		this.employeesChanged.next(Object.values(this.employees));
	}
}