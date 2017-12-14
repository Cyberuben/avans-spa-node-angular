import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Subject } from "rxjs/Subject";

import { Employee } from "../../models/employee.model";
import { EmployeesService } from "../../services/employees.service";

@Component({
	selector: "app-employee-edit",
	templateUrl: "./employee-edit.component.html",
	styleUrls: ["./employee-edit.component.css"]
})
export class EmployeeEditComponent implements OnInit {
	employee = new Employee();

	constructor(private employeesService: EmployeesService,
				private route: ActivatedRoute,
				private router: Router) { }

	ngOnInit() {
		const id = this.route.snapshot.params.employeeId;
		if(id) {
			this.employeesService.get(id)
			.subscribe((employee: Employee) => {
				if(employee != null) {
					this.employee = employee;
					this.employeesService.employeeSelected.next(this.employee);
				}
			});
		}

		this.route.params
		.subscribe((params: Params) => {
			if(params.employeeId) {
				this.employeesService.get(params.employeeId)
				.subscribe((employee: Employee) => {
					if(employee != null) {
						this.employee = employee;
						this.employeesService.employeeSelected.next(this.employee);
					}
				});
			}
		});
	}

	onSave(form: NgForm) {
		const value = form.value;

		this.employee.name = value.name;
		this.employee.email = value.email;
		this.employee.registration = value.registration;

		if(this.employee._id) {
			this.employeesService.update(this.employee)
			.subscribe((employee: Employee) => {
				this.router.navigate(["/werknemers", this.employee._id]);
			});
		}else{
			this.employeesService.create(this.employee)
			.subscribe((employee: Employee) => {
				this.router.navigate(["/werknemers", employee._id]);
			});
		}
	}

	onDelete() {
		if(confirm("Weet u zeker dat u deze werknemer wilt verwijderen?")) {
			this.employeesService.remove(this.employee)
			.subscribe((employee: Employee) => {
				this.router.navigate(["/werknemers"]);
			});
		}
	}
}
