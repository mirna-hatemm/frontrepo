import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingSlotComponent } from './booking-slot.component';

describe('BookingSlotComponent', () => {
  let component: BookingSlotComponent;
  let fixture: ComponentFixture<BookingSlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingSlotComponent]
    });
    fixture = TestBed.createComponent(BookingSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
