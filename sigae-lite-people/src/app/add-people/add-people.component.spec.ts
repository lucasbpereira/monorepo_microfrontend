import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPeopleComponent } from './add-people.component';
import { PeopleService } from '../people/people.service';
import { SchoolsService } from '../shared/services/schools.service';
import { AddressService } from '../shared/services/address.service';
import { MessageService } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AddPeopleComponent', () => {
  let component: AddPeopleComponent;
  let fixture: ComponentFixture<AddPeopleComponent>;
  let mockPeopleService: any;
  let mockSchoolsService: any;
  let mockAddressService: any;
  let mockMessageService: any;

  beforeEach(async () => {
    // Create mock services
    mockPeopleService = {
      createPeople: jest.fn()
    };
    mockSchoolsService = {
      getSchoolsData: jest.fn().mockReturnValue(['School 1', 'School 2'])
    };
    mockAddressService = {
      getAddressByCep: jest.fn().mockReturnValue(of({}))
    };
    mockMessageService = {
      add: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [AddPeopleComponent, HttpClientTestingModule, NoopAnimationsModule],
      providers: [
        FormBuilder,
        { provide: PeopleService, useValue: mockPeopleService },
        { provide: SchoolsService, useValue: mockSchoolsService },
        { provide: AddressService, useValue: mockAddressService },
        { provide: MessageService, useValue: mockMessageService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});