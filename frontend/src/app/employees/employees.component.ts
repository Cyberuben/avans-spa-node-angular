import { Component } from "@angular/core";

import { EmployeesService } from "../services/employees.service";

@Component({
	selector: "app-employees",
	templateUrl: "./employees.component.html",
	styleUrls: ["./employees.component.css"],
	providers: [EmployeesService]
})
export class EmployeesComponent {
	constructor() { }

}