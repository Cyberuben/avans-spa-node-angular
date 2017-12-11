import { Subject } from "rxjs/Subject";

import { ExternalService } from "./external.service";

import { Employee } from "../models/employee.model";

export class EmployeesService implements ExternalService {
	items: Employee[];

	employeesChanged = new Subject<Employee[]>();

	constructor() {
		this.items = [(new Employee("Ruben Rutten", "ruben@rubenrutten.nl", 1))];

		this.items[0].id = Math.random().toString(36).slice(2);
	}

	create(employee: Employee) {
		let id = Math.random().toString(36).slice(2);
		employee.id = id;
		this.items.push(employee);

		this.employeesChanged.next(this.items.slice());

		return Promise.resolve(employee);
	}

	get(id: string) {
		for(let i = 0; i < this.items.length; i++) {
			if(this.items[i].id == id) {
				return Promise.resolve(this.items[i]);
			}
		}

		return Promise.resolve(null);
	}

	getAll() {
		return Promise.resolve(this.items.slice());
	}

	update(employee: Employee) {
		this.employeesChanged.next(this.items.slice());

		return Promise.resolve(employee);
	}

	remove(employee: Employee) {
		this.employeesChanged.next(this.items.slice());

		return Promise.resolve(employee);
	}
}