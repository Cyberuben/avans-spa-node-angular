import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent, HttpEventType } from "@angular/common/http";
import "rxjs/Rx";
import { Observable } from "rxjs/Observable";

import { BaseModel } from "../models/base.model";
import { Employee } from "../models/employee.model";

import { environment } from "../../environments/environment";

export class DataStorageService<T extends BaseModel> {
	baseUrl = environment.apiUrl;
	resourceKey: string;

	constructor(private httpClient: HttpClient, resourceKey: string) {
		this.resourceKey = resourceKey;
	}

	create(model: T) {
		return this.httpClient.post<T>(`${this.baseUrl}/${this.resourceKey}`, model);
	}

	get(id: string) {
		return this.httpClient.get<T>(`${this.baseUrl}/${this.resourceKey}/${id}`);
	}

	getAll() {
		return this.httpClient.get<T[]>(`${this.baseUrl}/${this.resourceKey}`);
	}

	update(model: T) {
		return this.httpClient.put<T>(`${this.baseUrl}/${this.resourceKey}/${model._id}`, model);
	}

	remove(model: T) {
		return this.httpClient.delete<T>(`${this.baseUrl}/${this.resourceKey}/${model._id}`)
		.map((model) => model as T);
	}
}