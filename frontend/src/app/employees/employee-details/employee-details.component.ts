import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { Employee } from "../../models/employee.model";
import { EmployeesService } from "../../services/employees.service";

@Component({
	selector: "app-employee-details",
	templateUrl: "./employee-details.component.html",
	styleUrls: ["./employee-details.component.css"]
})
export class EmployeeDetailsComponent implements OnInit {
	employee = new Employee();
	diplomas: object[] = [];

	constructor(private employeesService: EmployeesService,
				private route: ActivatedRoute,
				private router: Router) { }

	ngOnInit() {
		const id = this.route.snapshot.params.employeeId;
		this.employeesService.get(id)
		.subscribe((employee: Employee) => {
			this.employee = employee;
			this.getDiplomas();
			this.employeesService.employeeSelected.next(this.employee);
		});

		this.route.params
		.subscribe((params: Params) => {
			this.employeesService.get(params.employeeId)
			.subscribe((employee: Employee) => {
				this.employee = employee;
				this.getDiplomas();
				this.employeesService.employeeSelected.next(this.employee);
			});
		});
	}

	reloadData() {
		this.employeesService.get(this.employee._id, true)
		.subscribe((employee: Employee) => {
			this.employee = employee;
			this.getDiplomas();
		});
	}

	getDiplomas() {
		this.employeesService.getDiplomas(this.employee._id)
		.subscribe((diplomas) => {
			this.diplomas = diplomas;
		});
	}

	removeDiploma(diplomaId: string) {
		if(confirm("Weet je zeker dat je dit diploma van deze werknemer wilt verwijderen?")) {
			this.employeesService.removeDiploma(this.employee._id, diplomaId)
			.subscribe(() => {
				this.getDiplomas();
			});
		}
	}
}
