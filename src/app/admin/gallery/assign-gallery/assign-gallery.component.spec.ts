import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignGalleryComponent } from './assign-gallery.component';

describe('AssignGalleryComponent', () => {
  let component: AssignGalleryComponent;
  let fixture: ComponentFixture<AssignGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
