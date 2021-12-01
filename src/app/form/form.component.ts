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
      licensePlate: ['', [Validators.required, Validators.pattern("^([A-Za-z]{2}-?[0-9]{3}-?[A-Za-z]{2})?([A-Za-z]{3}-?[0-9]{3})?$")]]
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
            cars => {
                this.router.navigate(['/home']);
            },
            error => {
                alert(error.message);
                this.loading = false;
            });
}

}
