import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverProductComponent } from './discover-product.component';

describe('DiscoverProductComponent', () => {
  let component: DiscoverProductComponent;
  let fixture: ComponentFixture<DiscoverProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscoverProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
