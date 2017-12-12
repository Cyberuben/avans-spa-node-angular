import { Component, OnInit, Input } from '@angular/core';

import { Employee } from "../../../models/employee.model";
import { EmployeesService } from "../../../services/employees.service";

@Component({
	selector: 'app-employees-list-item',
	templateUrl: './employees-list-item.component.html',
	styleUrls: ['./employees-list-item.component.css']
})
export class EmployeesListItemComponent implements OnInit {
	@Input() employee: Employee;

	constructor(private employeesService: EmployeesService) {}

	ngOnInit() {

	}
}
