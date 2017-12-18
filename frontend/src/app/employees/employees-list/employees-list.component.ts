import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { Employee } from "../../models/employee.model";
import { EmployeesService } from "../../services/employees.service";

@Component({
	selector: "app-employees-list",
	templateUrl: "./employees-list.component.html",
	styleUrls: ["./employees-list.component.css"]
})
export class EmployeesListComponent implements OnInit {
	employees: Employee[];
	selectedEmployeeId: string;
	private subscription: Subscription;
	private _searchQuery: string = "";
	private _counter = 0;

	constructor(private employeesService: EmployeesService,
				private router: Router) {
		this.employees = [];
	}

	get searchQuery() {
		return this._searchQuery + " " + this._counter;
	}

	set searchQuery(newValue: string) {
		this._searchQuery = newValue.toLowerCase().replace(" "+this._counter, "");
		this._counter++;
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

		this.employeesService.employeeSelected
		.subscribe((employee: Employee) => {
			this.selectedEmployeeId = employee._id;
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	reloadData() {
		this.employeesService.getAll()
		.subscribe((employees: Array<Employee>) => {
			this.employees = employees;
			this.router.navigate(["/werknemers"]);
		});
	}
}
