import { Injectable } from '@angular/core';
import { CalendarEvent } from '../shared/interfaces/calendar-event';

@Injectable()
export class CalendarService {

  calendarData: CalendarEvent[] = [
        {
            "id": "16443adf-4c17-4523-8a65-fcd8f4483807",
            "task": "Dayle matinal",
            "event_date": "2025-10-30",
            "start_hour": "09:00",
            "finish_hour": "09:30",
            "tag": "done"
        },
          {
            "id": "16443adf-4c17-4523-8a65-fcd8f4483808",
            "task": "Review de orçamento",
            "event_date": "2025-10-31",
            "start_hour": "09:40",
            "finish_hour": "10:30",
            "tag": "in_progress"
        },
        {
            "id": "16443adf-4c17-4523-8a65-fcd8f4483809",
            "task": "Dayle matinal",
            "event_date": "2025-10-31",
            "start_hour": "10:00",
            "finish_hour": "10:30",
            "tag": "to_do"
        },
        {
            "id": "16443adf-4c17-4523-8a65-fcd8f4483810",
            "task": "Dayle matinal",
            "event_date": "2025-11-01",
            "start_hour": "09:00",
            "finish_hour": "09:30",
            "tag": "to_do"
        }
  ];

  getCalendarData(): CalendarEvent[] {
      return this.calendarData
  }

  getCalendarToday(): Promise<CalendarEvent[]> {
    const todayStr = this.formatDateLocal(new Date());
    const eventsToday = this.calendarData.filter(event => event.event_date === todayStr);
    return Promise.resolve(eventsToday);
  }

  getCalendarTomorrow(): Promise<CalendarEvent[]> {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = this.formatDateLocal(tomorrow);
    const eventsTomorrow = this.calendarData.filter(event => event.event_date === tomorrowStr);
    return Promise.resolve(eventsTomorrow);
  }

    createCalendar(calendar: CalendarEvent) {
        calendar.id = this.generateMockUUID();
        this.calendarData.unshift(calendar);
    }

  private formatDateLocal(date: Date): string {
    // Usa o fuso horário local, não UTC
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // formato YYYY-MM-DD
  }

  generateMockUUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          const v = c === 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
      });
  }}
