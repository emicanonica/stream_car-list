import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Router } from "@angular/router";
import { Car } from '../interfaces/car.interface';
import * as _ from 'lodash';

let localStorageCars = localStorage.getItem('cars');
let cars: Car[] = localStorageCars ? JSON.parse(localStorageCars) : [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    

    constructor(
        public router: Router
        ) {}


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        switch (true) {
            case request.url.includes('/cars') && request.method === 'POST':
                return this.createCar(request.body);
            case request.url.includes('/cars') && request.method === 'GET':
                return this.getCars(request.url.split('/')[4]);
            case request.url.includes('/cars') && request.method === 'DELETE':
                return this.deleteCar(request.url.split('/')[4]);
            default:
                return next.handle(request);
        }
    }

    getCars(filter?: string | null) {
        this.refresh();
        if (filter) {
            cars = _.filter(cars, function(c) { return  _.includes(c.licensePlate.toLowerCase(), filter.toLowerCase()); });
        }
        return of(new HttpResponse({ status: 200, body: cars }));
    }

    createCar(car: Car) {
        this.refresh();
        if (cars.find(c => c.licensePlate === car.licensePlate)) {
            return throwError({ message: 'Ya existe un auto con esta patente' });
        }

        car.id = parseInt(_.uniqueId());
        cars.push(car);
        localStorage.setItem('cars', JSON.stringify(cars));
        return of(new HttpResponse({ status: 200, body: cars }));
    }

    deleteCar(licensePlate: string) {
        this.refresh();
        cars = _.filter(cars, function(c) { return c.licensePlate !== licensePlate; });
        localStorage.setItem('cars', JSON.stringify(cars));
        return of(new HttpResponse({ status: 200, body: cars }));
    }

    refresh() {
        localStorageCars = localStorage.getItem('cars');
        cars = localStorageCars ? JSON.parse(localStorageCars) : [];
    }
}
