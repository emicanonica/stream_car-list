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
                return this.getCars(request.params.get('filter'));
            default:
                return next.handle(request);
        }
    }

    getCars(filter?: string | null) {

        if (filter) {
            cars = _.filter(cars, function(c) { return  _.includes(c.licensePlate.toLowerCase(), filter.toLowerCase()); });
        }
        return of(new HttpResponse({ status: 200, body: cars }));
    }

    createCar(car: Car) {

        if (cars.find(c => c.licensePlate === car.licensePlate)) {
            return throwError({ message: 'Ya existe un auto con esta patente' });
        }

        car.id = parseInt(_.uniqueId());
        cars.push(car);
        localStorage.setItem('cars', JSON.stringify(cars));
        return of(new HttpResponse({ status: 200, body: cars }));
    }

    deleteCar(car: Car) {
        cars = _.filter(cars, function(c) { return c.id === car.id; });
        localStorage.setItem('cars', JSON.stringify(cars));
        return of(new HttpResponse({ status: 200, body: cars }));
    }
}
