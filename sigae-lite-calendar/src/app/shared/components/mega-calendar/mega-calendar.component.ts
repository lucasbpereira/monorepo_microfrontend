import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarData } from '../../interfaces/calendar-data';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'sigae-lite-mega-calendar',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './mega-calendar.component.html',
  styleUrl: './mega-calendar.component.scss'
})
export class MegaCalendarComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  

}
