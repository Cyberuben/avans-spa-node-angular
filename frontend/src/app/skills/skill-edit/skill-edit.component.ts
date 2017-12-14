import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Subject } from "rxjs/Subject";

import { Skill } from "../../models/skill.model";
import { SkillsService } from "../../services/skills.service";

@Component({
	selector: "app-skill-edit",
	templateUrl: "./skill-edit.component.html",
	styleUrls: ["./skill-edit.component.css"]
})
export class SkillEditComponent implements OnInit {
	skill = new Skill();

	constructor(private skillsService: SkillsService,
				private route: ActivatedRoute,
				private router: Router) { }

	ngOnInit() {
		const id = this.route.snapshot.params.skillId;
		if(id) {
			this.skillsService.get(id)
			.subscribe((skill: Skill) => {
				if(skill != null) {
					this.skill = skill;
					this.skillsService.skillSelected.next(this.skill);
				}
			});
		}

		this.route.params
		.subscribe((params: Params) => {
			if(params.skillId) {
				this.skillsService.get(params.skillId)
				.subscribe((skill: Skill) => {
					if(skill != null) {
						this.skill = skill;
						this.skillsService.skillSelected.next(this.skill);
					}
				});
			}
		});
	}

	onSave(form: NgForm) {
		const value = form.value;

		this.skill.name = value.name;

		if(this.skill._id) {
			this.skillsService.update(this.skill)
			.subscribe((skill: Skill) => {
				this.router.navigate(["/vaardigheden", this.skill._id]);
			});
		}else{
			this.skillsService.create(this.skill)
			.subscribe((skill: Skill) => {
				this.router.navigate(["/vaardigheden", skill._id]);
			});
		}
	}

	onDelete() {
		if(confirm("Weet u zeker dat u deze vaardigheid wilt verwijderen?")) {
			this.skillsService.remove(this.skill)
			.subscribe((skill: Skill) => {
				this.router.navigate(["/vaardigheden"]);
			});
		}
	}
}
