import { Component, Input, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CalendarEvent } from '../../interfaces/calendar-event';
import { DayEvents } from '../../interfaces/day-events';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'sigae-lite-mega-calendar',
  standalone: true,
  imports: [AsyncPipe, CommonModule, Tag],
  templateUrl: './mega-calendar.component.html',
  styleUrl: './mega-calendar.component.scss'
})
export class MegaCalendarComponent implements OnInit {

  @Input() calendarData: CalendarEvent[] = [];
  @Input() currentDate: Date = new Date();

  weeks: DayEvents[][] = [];
  weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  ngOnInit() {
    this.generateCalendar();
  }

  ngOnChanges() {
    this.generateCalendar();
  }

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const firstDayOfWeek = firstDay.getDay();
    
    const startDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    const days: DayEvents[] = [];
    
    // --- Início da Correção ---
    // Adiciona dias do mês anterior (agora com eventos)
    for (let i = 0; i < startDay; i++) {
      const emptyDate = new Date(year, month, -i);
      
      // Lógica de busca de eventos adicionada
      const dateString = this.formatDate(emptyDate);
      const eventsForDay = this.calendarData.filter(event => 
        event.event_date === dateString
      );

      days.unshift({
        day: emptyDate.getDate(),
        date: emptyDate,
        events: eventsForDay // Usando os eventos filtrados
      });
    }
    // --- Fim da Correção ---
    
    // Adiciona todos os dias do mês atual
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const currentDate = new Date(year, month, day);
      const dateString = this.formatDate(currentDate);
      
      const eventsForDay = this.calendarData.filter(event => 
        event.event_date === dateString
      );
      
      days.push({
        day: day,
        date: currentDate,
        events: eventsForDay
      });
    }

    // Adiciona dias do próximo mês
    const daysInGrid = days.length;
    const daysToAdd = (7 - (daysInGrid % 7)) % 7;
    for (let i = 1; i <= daysToAdd; i++) {
      const nextMonthDay = new Date(year, month + 1, i);
      
      const dateString = this.formatDate(nextMonthDay);
      const eventsForDay = this.calendarData.filter(event => 
          event.event_date === dateString
      );
      
      days.push({
          day: nextMonthDay.getDate(),
          date: nextMonthDay,
          events: eventsForDay 
      });
    }
    
    // Divide em semanas
    this.weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      this.weeks.push(days.slice(i, i + 7));
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getMonthYear(): string {
    return `${this.monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
  }

  getTagClass(tag: string): string {
    switch (tag) {
      case 'done': return 'tag-done';
      case 'in_progress': return 'tag-in-progress';
      case 'to_do': return 'tag-to-do';
      default: return '';
    }
  }

  getTagText(tag: string): string {
    switch (tag) {
      case 'done': return 'Concluído';
      case 'in_progress': return 'Em Andamento';
      case 'to_do': return 'A Fazer';
      default: return '';
    }
  }

  changeMonth(offset: number) {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + offset,
      1
    );
    this.generateCalendar();
  }

  openDialog(day: DayEvents) {
    //TODO IMPLEMENTAR LÓGICA DE CRIAÇÃO DE EVENTOS NO CALENDÁRIO
    console.log(day)
    throw new Error('Method not implemented.');
  }
}
