import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";


import { Employee } from "../../models/employee.model";
import { EmployeesService } from "../../services/employees.service";

@Component({
	selector: 'app-employees-list',
	templateUrl: './employees-list.component.html',
	styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
	employees: Employee[];
	private subscription: Subscription;

	constructor(private employeesService: EmployeesService) {
		this.employees = [];
	}

	ngOnInit() {
		this.employeesService.getAll()
		.subscribe((employees: Array<Employee>) => {
			this.employees = employees;
		});

		this.subscription = this.employeesService.employeesChanged
		.subscribe((employees: Array<Employee>) => {
			this.employees = employees;
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
