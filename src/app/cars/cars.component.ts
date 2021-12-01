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
  searchFilter: string = '';

  constructor(
    private carService: CarService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.carService.getCars(this.searchFilter).subscribe( cars =>{
      this.cars = cars ?? [];
    },
    error => {
      alert(error.message);
    });
  }

  goToForm() {
    this.router.navigate(['/form']);
  }

  filter() {
    this.carService.getCars(this.searchFilter).subscribe( cars =>{
      this.cars = cars ?? [];
    },
    error => {
      alert(error.message);
    });
  }

  delete(car: Car) {
    if(confirm('¿Eliminar auto con patente ' + car.licensePlate + '?')) {
      this.carService.deleteCar(car).subscribe( cars => {
        this.filter();
      },
      error => {
        alert(error.message);
      });
    }
  }

}
