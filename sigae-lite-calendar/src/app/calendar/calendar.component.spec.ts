import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';
import { MegaCalendarComponent } from '../shared/components/mega-calendar/mega-calendar.component';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { Tag } from 'primeng/tag';
import { CalendarEvent } from '../shared/interfaces/calendar-event';

// Mock do serviço de calendário
class MockCalendarService {
  getCalendarData = jest.fn();
  getCalendarToday = jest.fn();
  getCalendarTomorrow = jest.fn();
}

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let mockCalendarService: MockCalendarService;

  beforeEach(async () => {
    // Resetar os mocks antes de cada teste
    jest.clearAllMocks();
    
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        DatePicker,
        Tag,
        MegaCalendarComponent,
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: CalendarService, useClass: MockCalendarService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    
    // Obter instância do serviço mockado
    mockCalendarService = TestBed.inject(CalendarService) as unknown as MockCalendarService;
    
    // Inicializar calendarEvent como array vazio para evitar erro no MegaCalendarComponent
    component.calendarEvent = [];
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should call getTodayAndTomorrowEvents on ngOnInit', () => {
      const getEventsSpy = jest.spyOn(component, 'getTodayAndTomorrowEvents');
      
      component.ngOnInit();
      
      expect(getEventsSpy).toHaveBeenCalled();
    });
  });

  describe('getTodayAndTomorrowEvents', () => {
    it('should fetch calendar data and populate lists', async () => {
      const mockCalendarEvents: CalendarEvent[] = [
        {
          id: '1',
          task: 'Test Task',
          event_date: '2025-10-31',
          start_hour: '09:00',
          finish_hour: '10:00',
          tag: 'to_do'
        }
      ];
      
      const mockTodayEvents: CalendarEvent[] = [
        {
          id: '2',
          task: 'Today Task',
          event_date: '2025-10-31',
          start_hour: '10:00',
          finish_hour: '11:00',
          tag: 'in_progress'
        }
      ];
      
      const mockTomorrowEvents: CalendarEvent[] = [
        {
          id: '3',
          task: 'Tomorrow Task',
          event_date: '2025-11-01',
          start_hour: '11:00',
          finish_hour: '12:00',
          tag: 'done'
        }
      ];
      
      mockCalendarService.getCalendarData.mockReturnValue(mockCalendarEvents);
      mockCalendarService.getCalendarToday.mockResolvedValue(mockTodayEvents);
      mockCalendarService.getCalendarTomorrow.mockResolvedValue(mockTomorrowEvents);
      
      await component.getTodayAndTomorrowEvents();
      
      expect(component.calendarEvent).toEqual(mockCalendarEvents);
      expect(component.todayTaskList).toEqual(mockTodayEvents);
      expect(component.tomorrowTaskList).toEqual(mockTomorrowEvents);
    });
  });
});