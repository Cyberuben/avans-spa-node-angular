import { Component } from "@angular/core";

import { SkillsService } from "../services/skills.service";

@Component({
	selector: "app-skills",
	templateUrl: "./skills.component.html",
	styleUrls: ["./skills.component.css"],
	providers: [SkillsService]
})
export class SkillsComponent {
	constructor() { }

}
