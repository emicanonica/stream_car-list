import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Car } from '../interfaces/car.interface';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form!: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      color: ['', Validators.required],
      licensePlate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form?.invalid) {
        return;
    }

    this.loading = true;
    let car: Car = {
      color: this.form.get('color')?.value,
      licensePlate: this.form.get('licensePlate')?.value,
    }
    this.carService.createCar(car).subscribe(
            data => {
                this.router.navigate(['/home']);
            },
            error => {
                alert(error.message);
                this.loading = false;
            });
}

}
