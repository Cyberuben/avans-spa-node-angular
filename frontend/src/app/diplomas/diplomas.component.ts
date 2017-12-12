import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Diploma } from "../models/diploma.model";
import { DiplomasService } from "../services/diplomas.service";

@Component({
	selector: 'app-diplomas',
	templateUrl: './diplomas.component.html',
	styleUrls: ['./diplomas.component.css'],
	providers: [DiplomasService]
})
export class DiplomasComponent implements OnInit {

	constructor(private diplomasService: DiplomasService,
				private route: ActivatedRoute) { }

	ngOnInit() {
	}

}
