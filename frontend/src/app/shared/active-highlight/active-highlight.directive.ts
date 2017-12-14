import { Directive, HostBinding, OnChanges, Input } from "@angular/core";
import { ActivatedRoute, Params, Router, NavigationEnd } from "@angular/router";

@Directive({
	selector: "[appActiveHighlight]"
})
export class ActiveHighlightDirective implements OnChanges {
	@HostBinding("class.active") isActive = false;
	@Input() requiredValue: string;
	@Input() currentValue: string;

	constructor(private route: ActivatedRoute) { }

	ngOnChanges(changes) {
		if(changes.currentValue || changes.requiredValue) {
			this.isActive = (this.requiredValue == "" && this.currentValue == "") || (this.requiredValue == this.currentValue);
		}
	}
}
