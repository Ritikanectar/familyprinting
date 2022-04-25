import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewfrontComponent } from './previewfront.component';

describe('PreviewfrontComponent', () => {
  let component: PreviewfrontComponent;
  let fixture: ComponentFixture<PreviewfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewfrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
