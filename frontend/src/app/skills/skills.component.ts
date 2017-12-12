import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Skill } from "../models/skill.model";
import { SkillsService } from "../services/skills.service";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
	providers: [SkillsService]
})
export class SkillsComponent implements OnInit {

	constructor(private skillsService: SkillsService,
				private route: ActivatedRoute) { }

	ngOnInit() {

	}
}
