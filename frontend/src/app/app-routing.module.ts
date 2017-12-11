import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EmployeesComponent } from "./employees/employees.component";
import { DiplomasComponent } from "./diplomas/diplomas.component";
import { SkillsComponent } from "./skills/skills.component";
import { EmployeesListComponent } from "./employees/employees-list/employees-list.component";
import { EmployeeDetailsComponent } from "./employees/employee-details/employee-details.component";
import { EmployeesListItemComponent } from "./employees/employees-list/employees-list-item/employees-list-item.component";
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
	{ path: "", redirectTo: "/werknemers", pathMatch: "full" },
	{ path: "werknemers", component: EmployeesComponent, children: [
		{ path: ":id", component: EmployeeDetailsComponent },
	]},
	{ path: "diplomas", component: DiplomasComponent },
	{ path: "vaardigheden", component: SkillsComponent },
	{ path: "**", component: NotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {

}