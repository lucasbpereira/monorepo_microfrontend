import { CalendarEvent } from "./calendar-event";

export interface DayEvents {
  day: number;
  date: Date;
  events: CalendarEvent[];
}