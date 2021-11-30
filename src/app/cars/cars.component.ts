import { Component, OnInit } from '@angular/core';
import { Car } from '../interfaces/car';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  cars: Car[] = [
    {
      id:1,
      color: 'blue',
      licensePlate: 'AAA123'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
