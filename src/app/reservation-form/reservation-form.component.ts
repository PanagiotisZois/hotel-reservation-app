import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute){

  }
  
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      const newReservation: Reservation = this.reservationForm.value;
      this.reservationService.addReservation(newReservation).subscribe(
        () => {
          console.log('Reservation successfully added');
          this.router.navigate(['/reservations']);  // Redirect to reservations list or another route
        },
        (error) => {
          console.error('Error adding reservation:', error);
        }
      );
    }
  }
}