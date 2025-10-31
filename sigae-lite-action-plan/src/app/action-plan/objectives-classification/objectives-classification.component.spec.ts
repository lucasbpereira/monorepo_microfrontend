import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectivesClassificationComponent } from './objectives-classification.component';

describe('ObjectivesClassificationComponent', () => {
  let component: ObjectivesClassificationComponent;
  let fixture: ComponentFixture<ObjectivesClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectivesClassificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectivesClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
