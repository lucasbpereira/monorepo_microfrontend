import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MegaCalendarComponent } from './mega-calendar.component';
import { Tag } from 'primeng/tag';
import { CalendarEvent } from '../../interfaces/calendar-event';

describe('MegaCalendarComponent', () => {
  let component: MegaCalendarComponent;
  let fixture: ComponentFixture<MegaCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MegaCalendarComponent, Tag, NoopAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MegaCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should initialize with default values', () => {
      expect(component.calendarData).toEqual([]);
      expect(component.weekDays).toEqual(['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']);
      expect(component.monthNames).toEqual([
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ]);
      // weeks é gerado automaticamente quando o componente é inicializado
      expect(component.weeks).toBeDefined();
    });
  });

  describe('generateCalendar', () => {
    it('should generate calendar weeks with days', () => {
      const mockEvents: CalendarEvent[] = [
        {
          id: '1',
          task: 'Test Event',
          event_date: '2025-10-31',
          start_hour: '09:00',
          finish_hour: '10:00',
          tag: 'to_do'
        }
      ];
      
      component.calendarData = mockEvents;
      component.currentDate = new Date(2025, 9, 1); // Outubro 2025
      component.generateCalendar();
      
      expect(component.weeks).toBeDefined();
      expect(component.weeks.length).toBeGreaterThan(0);
      // Verificar se pelo menos uma semana tem dias
      expect(component.weeks[0].length).toBe(7);
    });
  });

  describe('formatDate', () => {
    it('should format date as YYYY-MM-DD', () => {
      const date = new Date(2025, 9, 31); // 31 de outubro de 2025
      const formatted = component.formatDate(date);
      expect(formatted).toBe('2025-10-31');
    });
  });

  describe('getMonthYear', () => {
    it('should return formatted month and year', () => {
      component.currentDate = new Date(2025, 9, 1); // Outubro 2025
      const monthYear = component.getMonthYear();
      expect(monthYear).toBe('Outubro 2025');
    });
  });

  describe('getTagClass', () => {
    it('should return appropriate CSS class for each tag type', () => {
      expect(component.getTagClass('done')).toBe('tag-done');
      expect(component.getTagClass('in_progress')).toBe('tag-in-progress');
      expect(component.getTagClass('to_do')).toBe('tag-to-do');
      expect(component.getTagClass('unknown')).toBe('');
    });
  });

  describe('getTagText', () => {
    it('should return appropriate text for each tag type', () => {
      expect(component.getTagText('done')).toBe('Concluído');
      expect(component.getTagText('in_progress')).toBe('Em Andamento');
      expect(component.getTagText('to_do')).toBe('A Fazer');
      expect(component.getTagText('unknown')).toBe('');
    });
  });

  describe('changeMonth', () => {
    it('should change to the next month', () => {
      const initialDate = new Date(2025, 9, 1); // Outubro 2025
      component.currentDate = initialDate;
      
      component.changeMonth(1); // Próximo mês
      
      expect(component.currentDate.getMonth()).toBe(10); // Novembro
      expect(component.currentDate.getFullYear()).toBe(2025);
    });

    it('should change to the previous month', () => {
      const initialDate = new Date(2025, 9, 1); // Outubro 2025
      component.currentDate = initialDate;
      
      component.changeMonth(-1); // Mês anterior
      
      expect(component.currentDate.getMonth()).toBe(8); // Setembro
      expect(component.currentDate.getFullYear()).toBe(2025);
    });
  });

  describe('openDialog', () => {
    it('should log day information and throw error', () => {
      const mockDay = {
        day: 1,
        date: new Date(2025, 9, 1),
        events: []
      };
      
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      expect(() => {
        component.openDialog(mockDay);
      }).toThrow('Method not implemented.');
      
      expect(consoleSpy).toHaveBeenCalledWith(mockDay);
      consoleSpy.mockRestore();
    });
  });
});