import { Component } from "@angular/core";

import { DiplomasService } from "../services/diplomas.service";

@Component({
	selector: "app-diplomas",
	templateUrl: "./diplomas.component.html",
	styleUrls: ["./diplomas.component.css"],
	providers: [DiplomasService]
})
export class DiplomasComponent {
	constructor() { }

}