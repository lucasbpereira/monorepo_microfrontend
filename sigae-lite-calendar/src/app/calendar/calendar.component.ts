import { Component, OnInit } from '@angular/core';
import { MegaCalendarComponent } from '../shared/components/mega-calendar/mega-calendar.component';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { CalendarEvent } from '../shared/interfaces/calendar-event';
import { CalendarService } from './calendar.service';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MegaCalendarComponent, FormsModule, DatePicker, Tag],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  providers: [CalendarService]
})
export class CalendarComponent implements OnInit {

  date: Date[] | undefined;

  calendarEvent!: CalendarEvent[];
  todayTaskList!: CalendarEvent[];
  tomorrowTaskList!: CalendarEvent[];
  currentDate = new Date(2025, 9, 1);
  
  constructor(private service: CalendarService) {
    
  }

  ngOnInit(): void {
    this.getTodayAndTomorrowEvents()
  }

  async getTodayAndTomorrowEvents() {
    this.calendarEvent = await this.service.getCalendarData();
    this.todayTaskList = await this.service.getCalendarToday();
    this.tomorrowTaskList = await this.service.getCalendarTomorrow();
  }
}
