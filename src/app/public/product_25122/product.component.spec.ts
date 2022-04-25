import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPublicComponent } from './ProductPublicComponent';

describe('ProductComponent', () => {
  let component: ProductPublicComponent;
  let fixture: ComponentFixture<ProductPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
