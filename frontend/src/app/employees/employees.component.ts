import { Component } from "@angular/core";

import { EmployeesService } from "../services/employees.service";
import { DiplomasService } from "../services/diplomas.service";
import { SkillsService } from "../services/skills.service";

@Component({
	selector: "app-employees",
	templateUrl: "./employees.component.html",
	styleUrls: ["./employees.component.css"],
	providers: [EmployeesService, DiplomasService, SkillsService]
})
export class EmployeesComponent {
	constructor() { }

}