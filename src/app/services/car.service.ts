import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Car } from '../interfaces/car.interface';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(
    public httpClient: HttpClient
  ) { }

  public getCars(filter?: string):Observable<any>{
    filter = filter? filter : '';

    const url = environment.API_BASE_PATH + '/cars/' + filter;
    return this.httpClient.get<any>(url)
      .pipe(map((res)=>{
        return res;
      }));
  }

  public createCar(data: Car):Observable<any>{
    const url = environment.API_BASE_PATH + '/cars';
    return this.httpClient.post<any>(url, data)
      .pipe(map((res)=>{
        return res;
      }));
  }

  public deleteCar(car: Car):Observable<any>{
    const url = environment.API_BASE_PATH + '/cars/' + car.id;
    return this.httpClient.delete<any>(url)
      .pipe(map((res)=>{
        return res;
      }))
  }
}
