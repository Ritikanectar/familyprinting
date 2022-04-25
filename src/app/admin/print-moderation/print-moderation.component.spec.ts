import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintModerationComponent } from './print-moderation.component';

describe('PrintModerationComponent', () => {
  let component: PrintModerationComponent;
  let fixture: ComponentFixture<PrintModerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintModerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintModerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
