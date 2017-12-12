import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { Employee } from "../../models/employee.model";
import { EmployeesService } from "../../services/employees.service";

@Component({
	selector: 'app-employee-details',
	templateUrl: './employee-details.component.html',
	styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
	employee = new Employee();

	canEdit = false;

	constructor(private employeesService: EmployeesService,
				private route: ActivatedRoute,
				private router: Router) { }

	ngOnInit() {
		const id = this.route.snapshot.params.id;
		this.employeesService.get(id)
		.subscribe((employee: Employee) => {
			this.employee = employee;
		});

		this.route.params
		.subscribe((params: Params) => {
			this.employeesService.get(params.id)
			.subscribe((employee: Employee) => {
				this.employee = employee;
			});
		});
	}

	onEdit() {
		this.router.navigate(["aanpassen"]);
	}
}
