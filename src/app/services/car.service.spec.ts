import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CarService } from './car.service';
import { HttpClientModule } from '@angular/common/http';
import { Car } from '../interfaces/car.interface';

describe('CarService', () => {
  let service: CarService;
  const car = {
    id: 1,
    color: 'rojo',
    licensePlate: 'aaa111'
  }

  beforeEach(() => {
  TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        HttpClientModule
      ],
      providers: [CarService]
    });
    service = TestBed.inject(CarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('SHOULD CREATE A CAR', () => {
    expect(service.createCar(car)).toBeDefined();
    service.createCar(car).subscribe( (cars: Car[]) => {
      expect(cars).toEqual([car]);
    });
  });

  it('SHOULD GET CARS', () => {
    expect(service.getCars()).toBeDefined();
    service.getCars().subscribe( (cars: Car[]) => {
      expect(cars).toEqual([car]);
    });
  });

  it('SHOULD DELETE A CAR', () => {
    expect(service.deleteCar(car)).toBeDefined();
    service.deleteCar(car).subscribe( (cars: Car[]) => {
      expect(cars).toBeNull();
    });
  });

  it('SHOULD FAIL TRYING TO DELETE A CAR', () => {
    expect(service.deleteCar(car)).toBeDefined();
    service.deleteCar(car).subscribe( (cars: Car[]) => {
      expect(cars).toBeNull();
    },
    error => {
      expect(error).not.toBeNull();
    });
  });
});
