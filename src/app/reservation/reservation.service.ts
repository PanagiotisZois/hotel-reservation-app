import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl: string = "http://localhost:3001";
  private reservations: Reservation[] = [];

  constructor(private http: HttpClient){}

  // CRUD

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl+"/reservations");
  }

  getReservation(id: string): Observable<Reservation> {
    console.log(this.http.get<Reservation>(this.apiUrl+"/reservation/"+id));
    return this.http.get<Reservation>(this.apiUrl+"/reservation/"+id);
  }

  addReservation(reservation: Reservation): Observable<void>{
    console.log("Reservation has been added!");
    return this.http.post<void>(this.apiUrl + "/reservation", reservation);
    
  }

  deleteReservation(id: string): Observable<void>{

    return this.http.delete<void>(this.apiUrl + "/reservation/"+id);

    //let index = this.reservations.findIndex(res => res.id === id);
   // this.reservations.splice(index,1)
    
  }

  updateReservation(id: string, updatedReservation: Reservation): Observable<void>{

    return this.http.put<void>(this.apiUrl + "/reservation/" + id, updatedReservation);

    
  }
  
}
