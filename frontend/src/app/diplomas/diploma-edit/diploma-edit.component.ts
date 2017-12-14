import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Subject } from "rxjs/Subject";

import { Diploma } from "../../models/diploma.model";
import { DiplomasService } from "../../services/diplomas.service";

@Component({
	selector: "app-diploma-edit",
	templateUrl: "./diploma-edit.component.html",
	styleUrls: ["./diploma-edit.component.css"]
})
export class DiplomaEditComponent implements OnInit {
	diploma = new Diploma();

	constructor(private diplomasService: DiplomasService,
				private route: ActivatedRoute,
				private router: Router) { }

	ngOnInit() {
		const id = this.route.snapshot.params.diplomaId;
		if(id) {
			this.diplomasService.get(id)
			.subscribe((diploma: Diploma) => {
				if(diploma != null) {
					this.diploma = diploma;
					this.diplomasService.diplomaSelected.next(this.diploma);
				}
			});
		}

		this.route.params
		.subscribe((params: Params) => {
			if(params.diplomaId) {
				this.diplomasService.get(params.diplomaId)
				.subscribe((diploma: Diploma) => {
					if(diploma != null) {
						this.diploma = diploma;
						this.diplomasService.diplomaSelected.next(this.diploma);
					}
				});
			}
		});
	}

	onSave(form: NgForm) {
		const value = form.value;

		this.diploma.name = value.name;
		this.diploma.type = value.type;

		if(this.diploma._id) {
			this.diplomasService.update(this.diploma)
			.subscribe((diploma: Diploma) => {
				this.router.navigate(["/diplomas", this.diploma._id]);
			});
		}else{
			this.diplomasService.create(this.diploma)
			.subscribe((diploma: Diploma) => {
				this.router.navigate(["/diplomas", diploma._id]);
			});
		}
	}

	onDelete() {
		if(confirm("Weet u zeker dat u dit diploma wilt verwijderen?")) {
			this.diplomasService.remove(this.diploma)
			.subscribe((diploma: Diploma) => {
				this.router.navigate(["/diplomas"]);
			});
		}
	}
}
