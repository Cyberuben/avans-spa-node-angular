import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { Skill } from "../../models/skill.model";
import { SkillsService } from "../../services/skills.service";

@Component({
	selector: "app-skills-list",
	templateUrl: "./skills-list.component.html",
	styleUrls: ["./skills-list.component.css"]
})
export class SkillsListComponent implements OnInit {
	skills: Skill[];
	selectedSkillId: string;
	private subscription: Subscription;

	constructor(private skillsService: SkillsService,
				private router: Router) {
		this.skills = [];
	}

	ngOnInit() {
		this.skillsService.getAll()
		.subscribe((skills: Array<Skill>) => {
			this.skills = skills;
		});

		this.subscription = this.skillsService.skillsChanged
		.subscribe((skills: Array<Skill>) => {
			this.skills = skills;
		});

		this.skillsService.skillSelected
		.subscribe((skill: Skill) => {
			this.selectedSkillId = skill._id;
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	reloadData() {
		this.skillsService.getAll()
		.subscribe((skills: Array<Skill>) => {
			this.skills = skills;
			this.router.navigate(["/werknemers"]);
		});
	}
}
