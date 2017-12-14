import { Component } from "@angular/core";

import { EmployeesService } from "../services/employees.service";
import { DiplomasService } from "../services/diplomas.service";

@Component({
	selector: "app-employees",
	templateUrl: "./employees.component.html",
	styleUrls: ["./employees.component.css"],
	providers: [EmployeesService, DiplomasService]
})
export class EmployeesComponent {
	constructor() { }

}