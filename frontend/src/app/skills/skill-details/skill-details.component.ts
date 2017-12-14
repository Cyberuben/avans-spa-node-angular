import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { Skill } from "../../models/skill.model";
import { SkillsService } from "../../services/skills.service";

@Component({
	selector: "app-skill-details",
	templateUrl: "./skill-details.component.html",
	styleUrls: ["./skill-details.component.css"]
})
export class SkillDetailsComponent implements OnInit {
	skill = new Skill();

	constructor(private skillsService: SkillsService,
				private route: ActivatedRoute,
				private router: Router) { }

	ngOnInit() {
		const id = this.route.snapshot.params.skillId;
		this.skillsService.get(id)
		.subscribe((skill: Skill) => {
			this.skill = skill;
			this.skillsService.skillSelected.next(this.skill);
		});

		this.route.params
		.subscribe((params: Params) => {
			this.skillsService.get(params.skillId)
			.subscribe((skill: Skill) => {
				this.skill = skill;
				this.skillsService.skillSelected.next(this.skill);
			});
		});
	}

	reloadData() {
		this.skillsService.get(this.skill._id, true)
		.subscribe((skill: Skill) => {
			this.skill = skill;
		});
	}
}
