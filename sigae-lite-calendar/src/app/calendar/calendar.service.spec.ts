import { TestBed } from '@angular/core/testing';

import { CalendarService } from './calendar.service';

describe('CalendarService', () => {
  let service: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarService]
    });
    service = TestBed.inject(CalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCalendarData', () => {
    it('should return calendar data', () => {
      const data = service.getCalendarData();
      expect(data).toBeDefined();
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });
  });

  describe('getCalendarToday', () => {
    it('should return events for today', async () => {
      // Criar uma data específica para testar
      const today = new Date();
      const todayStr = service['formatDateLocal'](today);
      
      // Adicionar um evento para hoje nos dados de teste
      const todayEvent = {
        id: 'test-today',
        task: 'Today Event',
        event_date: todayStr,
        start_hour: '10:00',
        finish_hour: '11:00',
        tag: 'to_do'
      };
      
      service.calendarData.push(todayEvent);
      
      const todayEvents = await service.getCalendarToday();
      expect(todayEvents).toBeDefined();
      expect(Array.isArray(todayEvents)).toBe(true);
    });
  });

  describe('getCalendarTomorrow', () => {
    it('should return events for tomorrow', async () => {
      // Criar uma data específica para amanhã
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = service['formatDateLocal'](tomorrow);
      
      // Adicionar um evento para amanhã nos dados de teste
      const tomorrowEvent = {
        id: 'test-tomorrow',
        task: 'Tomorrow Event',
        event_date: tomorrowStr,
        start_hour: '10:00',
        finish_hour: '11:00',
        tag: 'to_do'
      };
      
      service.calendarData.push(tomorrowEvent);
      
      const tomorrowEvents = await service.getCalendarTomorrow();
      expect(tomorrowEvents).toBeDefined();
      expect(Array.isArray(tomorrowEvents)).toBe(true);
    });
  });

  describe('createCalendar', () => {
    it('should add a new calendar event', () => {
      const initialLength = service.calendarData.length;
      const newEvent = {
        id: '',
        task: 'New Event',
        event_date: '2025-11-01',
        start_hour: '10:00',
        finish_hour: '11:00',
        tag: 'to_do'
      };
      
      service.createCalendar(newEvent);
      
      expect(service.calendarData.length).toBe(initialLength + 1);
      expect(service.calendarData[0].id).toBeDefined();
      expect(service.calendarData[0].task).toBe('New Event');
    });
  });

  describe('formatDateLocal', () => {
    it('should format date correctly', () => {
      const date = new Date(2025, 9, 31); // 31 de outubro de 2025
      const formattedDate = service['formatDateLocal'](date);
      expect(formattedDate).toBe('2025-10-31');
    });
  });

  describe('generateMockUUID', () => {
    it('should generate a UUID-like string', () => {
      const uuid = service['generateMockUUID']();
      expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });
  });
});