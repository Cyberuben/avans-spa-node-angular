import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Employee } from "../models/employee.model";
import { EmployeesService } from "../services/employees.service";

@Component({
	selector: 'app-employees',
	templateUrl: './employees.component.html',
	styleUrls: ['./employees.component.css'],
	providers: [EmployeesService]
})
export class EmployeesComponent implements OnInit {

	constructor(private employeesService: EmployeesService,
				private route: ActivatedRoute) { }

	ngOnInit() {
	}


}
