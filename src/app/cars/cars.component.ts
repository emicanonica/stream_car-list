import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from '../interfaces/car.interface';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  cars: Car[] = [];

  constructor(
    private carService: CarService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.carService.getCars().subscribe( cars =>{
      this.cars = cars ?? [];
    });
  }

  goToForm() {
    this.router.navigate(['/form']);
  }

}
