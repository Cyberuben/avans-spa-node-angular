import { Component } from "@angular/core";

import { DiplomasService } from "../services/diplomas.service";
import { SkillsService } from "../services/skills.service";

@Component({
	selector: "app-diplomas",
	templateUrl: "./diplomas.component.html",
	styleUrls: ["./diplomas.component.css"],
	providers: [DiplomasService, SkillsService]
})
export class DiplomasComponent {
	constructor() { }

}