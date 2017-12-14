import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { Diploma } from "../../models/diploma.model";
import { DiplomasService } from "../../services/diplomas.service";

@Component({
	selector: "app-diplomas-list",
	templateUrl: "./diplomas-list.component.html",
	styleUrls: ["./diplomas-list.component.css"]
})
export class DiplomasListComponent implements OnInit {
	diplomas: Diploma[];
	selectedDiplomaId: string;
	private subscription: Subscription;

	constructor(private diplomasService: DiplomasService,
				private router: Router) {
		this.diplomas = [];
	}

	ngOnInit() {
		this.diplomasService.getAll()
		.subscribe((diplomas: Array<Diploma>) => {
			this.diplomas = diplomas;
		});

		this.subscription = this.diplomasService.diplomasChanged
		.subscribe((diplomas: Array<Diploma>) => {
			this.diplomas = diplomas;
		});

		this.diplomasService.diplomaSelected
		.subscribe((diploma: Diploma) => {
			this.selectedDiplomaId = diploma._id;
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	reloadData() {
		this.diplomasService.getAll()
		.subscribe((diplomas: Array<Diploma>) => {
			this.diplomas = diplomas;
			this.router.navigate(["/diplomas"]);
		});
	}
}
