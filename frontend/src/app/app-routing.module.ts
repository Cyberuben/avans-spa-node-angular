import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EmployeesComponent } from "./employees/employees.component";
import { EmployeesListComponent } from "./employees/employees-list/employees-list.component";
import { EmployeeEditComponent } from "./employees/employee-edit/employee-edit.component";
import { EmployeeDetailsComponent } from "./employees/employee-details/employee-details.component";

import { DiplomasComponent } from "./diplomas/diplomas.component";
import { DiplomasListComponent } from "./diplomas/diplomas-list/diplomas-list.component";
import { DiplomaEditComponent } from "./diplomas/diploma-edit/diploma-edit.component";
import { DiplomaDetailsComponent } from "./diplomas/diploma-details/diploma-details.component";

import { SkillsComponent } from "./skills/skills.component";
import { SkillsListComponent } from "./skills/skills-list/skills-list.component";
import { SkillEditComponent } from "./skills/skill-edit/skill-edit.component";
import { SkillDetailsComponent } from "./skills/skill-details/skill-details.component";

import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
	{ path: "", redirectTo: "/werknemers", pathMatch: "full" },
	{ path: "werknemers", component: EmployeesComponent, children: [
		{ path: "nieuw", component: EmployeeEditComponent },
		{ path: ":employeeId/aanpassen", component: EmployeeEditComponent },
		{ path: ":employeeId", component: EmployeeDetailsComponent },
	]},
	{ path: "diplomas", component: DiplomasComponent, children: [
		{ path: "nieuw", component: DiplomaEditComponent },
		{ path: ":diplomaId/aanpassen", component: DiplomaEditComponent },
		{ path: ":diplomaId", component: DiplomaDetailsComponent },
	]},
	{ path: "vaardigheden", component: SkillsComponent, children: [
		{ path: "nieuw", component: SkillEditComponent },
		{ path: ":skillId/aanpassen", component: SkillEditComponent },
		{ path: ":skillId", component: SkillDetailsComponent },
	] },
	{ path: "**", component: NotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {

}