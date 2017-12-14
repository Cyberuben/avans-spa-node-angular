import { Component, Input } from "@angular/core";

import { Skill } from "../../../models/skill.model";
import { SkillsService } from "../../../services/skills.service";

@Component({
	selector: "app-skills-list-item",
	templateUrl: "./skills-list-item.component.html",
	styleUrls: ["./skills-list-item.component.css"]
})
export class SkillsListItemComponent {
	@Input() skill: Skill;

	constructor(private skillsService: SkillsService) {}
}
