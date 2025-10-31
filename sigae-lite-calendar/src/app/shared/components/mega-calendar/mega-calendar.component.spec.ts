import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MegaCalendarComponent } from './mega-calendar.component';

describe('MegaCalendarComponent', () => {
  let component: MegaCalendarComponent;
  let fixture: ComponentFixture<MegaCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MegaCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MegaCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
