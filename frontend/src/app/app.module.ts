import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { DiplomasComponent } from './diplomas/diplomas.component';
import { SkillsComponent } from './skills/skills.component';
import { DropdownDirective } from './dropdown.directive';


@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    DiplomasComponent,
    SkillsComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
