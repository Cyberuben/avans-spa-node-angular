import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
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
import { SkillsListComponent } from './skills/skills-list/skills-list.component';
import { SkillsListItemComponent } from './skills/skills-list/skills-list-item/skills-list-item.component';
import { DiplomasListComponent } from './diplomas/diplomas-list/diplomas-list.component';
import { DiplomasListItemComponent } from './diplomas/diplomas-list/diplomas-list-item/diplomas-list-item.component';
import { DiplomaDetailsComponent } from './diplomas/diploma-details/diploma-details.component';
import { SkillDetailsComponent } from './skills/skill-details/skill-details.component';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { ActiveHighlightDirective } from './shared/active-highlight/active-highlight.directive';
import { DiplomaEditComponent } from './diplomas/diploma-edit/diploma-edit.component';
import { SkillEditComponent } from './skills/skill-edit/skill-edit.component';

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
		NotFoundComponent,
		SkillsListComponent,
		SkillsListItemComponent,
		DiplomasListComponent,
		DiplomasListItemComponent,
		DiplomaDetailsComponent,
		SkillDetailsComponent,
		EmployeeEditComponent,
		ActiveHighlightDirective,
		DiplomaEditComponent,
		SkillEditComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
