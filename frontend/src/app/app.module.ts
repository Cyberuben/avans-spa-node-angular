import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";


import { AppComponent } from "./app.component";
import { EmployeesComponent } from "./employees/employees.component";
import { DiplomasComponent } from "./diplomas/diplomas.component";
import { SkillsComponent } from "./skills/skills.component";
import { DropdownDirective } from "./shared/dropdown/dropdown.directive";
import { HeaderComponent } from "./shared/header/header.component";
import { EmployeesListComponent } from "./employees/employees-list/employees-list.component";
import { EmployeeDetailsComponent } from "./employees/employee-details/employee-details.component";
import { EmployeesListItemComponent } from "./employees/employees-list/employees-list-item/employees-list-item.component";
import { NotFoundComponent } from './not-found/not-found.component';

import { AppRoutingModule } from "./app-routing.module";

@NgModule({
	declarations: [
		AppComponent,
		EmployeesComponent,
		DiplomasComponent,
		SkillsComponent,
		DropdownDirective,
		HeaderComponent,
		EmployeesListComponent,
		EmployeeDetailsComponent,
		EmployeesListItemComponent,
		NotFoundComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
