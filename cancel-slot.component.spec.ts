import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelSlotComponent } from './cancel-slot.component';

describe('CancelSlotComponent', () => {
  let component: CancelSlotComponent;
  let fixture: ComponentFixture<CancelSlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelSlotComponent]
    });
    fixture = TestBed.createComponent(CancelSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
