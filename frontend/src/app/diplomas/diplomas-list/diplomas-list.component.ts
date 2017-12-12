import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";


import { Diploma } from "../../models/diploma.model";
import { DiplomasService } from "../../services/diplomas.service";

@Component({
	selector: 'app-diplomas-list',
	templateUrl: './diplomas-list.component.html',
	styleUrls: ['./diplomas-list.component.css']
})
export class DiplomasListComponent implements OnInit {
	diplomas: Diploma[];
	private subscription: Subscription;

	constructor(private diplomasService: DiplomasService) {
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
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
