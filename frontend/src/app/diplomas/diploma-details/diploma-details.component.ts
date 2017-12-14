import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NgForm } from "@angular/forms";

import { Diploma } from "../../models/diploma.model";
import { DiplomasService } from "../../services/diplomas.service";
import { Skill } from "../../models/skill.model";
import { SkillsService } from "../../services/skills.service";

@Component({
	selector: "app-diploma-details",
	templateUrl: "./diploma-details.component.html",
	styleUrls: ["./diploma-details.component.css"]
})
export class DiplomaDetailsComponent implements OnInit {
	diploma = new Diploma();
	skills: object[] = [];
	allSkills: Skill[] = [];

	constructor(private diplomasService: DiplomasService,
				private skillsService: SkillsService,
				private route: ActivatedRoute,
				private router: Router) { }

	ngOnInit() {
		this.getAllSkills();

		const id = this.route.snapshot.params.diplomaId;
		this.diplomasService.get(id)
		.subscribe((diploma: Diploma) => {
			this.diploma = diploma;
			this.getSkills();
			this.diplomasService.diplomaSelected.next(this.diploma);
		});

		this.route.params
		.subscribe((params: Params) => {
			this.diplomasService.get(params.diplomaId)
			.subscribe((diploma: Diploma) => {
				this.diploma = diploma;
				this.getSkills();
				this.diplomasService.diplomaSelected.next(this.diploma);
			});
		});
	}

	reloadData() {
		this.getAllSkills();

		this.diplomasService.get(this.diploma._id, true)
		.subscribe((diploma: Diploma) => {
			this.getSkills();
			this.diploma = diploma;
		});
	}

	getSkills() {
		this.diplomasService.getSkills(this.diploma._id)
		.subscribe((skills) => {
			this.skills = skills;
		});
	}

	getAllSkills() {
		this.skillsService.getAll()
		.subscribe((skills: Skill[]) => {
			this.allSkills = skills;
		});
	}

	removeSkill(skillId: string) {
		if(confirm("Weet je zeker dat je deze vaardigheid van dit diploma wilt verwijderen?")) {
			this.diplomasService.removeSkill(this.diploma._id, skillId)
			.subscribe(() => {
				this.getSkills();
			});
		}
	}

	addSkill(form: NgForm) {
		const value = form.value;

		this.diplomasService.addSkill(this.diploma._id, form.value.skillId)
		.subscribe(() => {
			this.getSkills();
		});
	}
}
