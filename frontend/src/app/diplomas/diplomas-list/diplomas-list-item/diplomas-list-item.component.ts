import { Component, Input } from "@angular/core";

import { Diploma } from "../../../models/diploma.model";
import { DiplomasService } from "../../../services/diplomas.service";

@Component({
	selector: "app-diplomas-list-item",
	templateUrl: "./diplomas-list-item.component.html",
	styleUrls: ["./diplomas-list-item.component.css"]
})
export class DiplomasListItemComponent {
	@Input() diploma: Diploma;

	constructor(private diplomasService: DiplomasService) {}
}
