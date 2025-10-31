import { CalendarDay } from "./calendar-day";
import { CalendarEvent } from "./calendar-event";

export interface CalendarData {
  currentMonth: string;
  days: CalendarDay[];
  today: CalendarEvent;
  tomorrow: CalendarEvent;
}