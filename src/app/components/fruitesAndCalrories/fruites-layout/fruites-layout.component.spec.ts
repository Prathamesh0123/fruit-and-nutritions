import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitesLayoutComponent } from './fruites-layout.component';

describe('FruitesLayoutComponent', () => {
  let component: FruitesLayoutComponent;
  let fixture: ComponentFixture<FruitesLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FruitesLayoutComponent]
    });
    fixture = TestBed.createComponent(FruitesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
