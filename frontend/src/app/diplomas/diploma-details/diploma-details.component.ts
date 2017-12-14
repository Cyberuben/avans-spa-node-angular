import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { Diploma } from "../../models/diploma.model";
import { DiplomasService } from "../../services/diplomas.service";

@Component({
	selector: "app-diploma-details",
	templateUrl: "./diploma-details.component.html",
	styleUrls: ["./diploma-details.component.css"]
})
export class DiplomaDetailsComponent implements OnInit {
	diploma = new Diploma();

	constructor(private diplomasService: DiplomasService,
				private route: ActivatedRoute,
				private router: Router) { }

	ngOnInit() {
		const id = this.route.snapshot.params.diplomaId;
		this.diplomasService.get(id)
		.subscribe((diploma: Diploma) => {
			this.diploma = diploma;
			this.diplomasService.diplomaSelected.next(this.diploma);
		});

		this.route.params
		.subscribe((params: Params) => {
			this.diplomasService.get(params.diplomaId)
			.subscribe((diploma: Diploma) => {
				this.diploma = diploma;
				this.diplomasService.diplomaSelected.next(this.diploma);
			});
		});
	}

	reloadData() {
		this.diplomasService.get(this.diploma._id, true)
		.subscribe((diploma: Diploma) => {
			this.diploma = diploma;
		});
	}
}
