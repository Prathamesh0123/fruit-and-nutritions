import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruiteshomeComponent } from './fruiteshome.component';

describe('FruiteshomeComponent', () => {
  let component: FruiteshomeComponent;
  let fixture: ComponentFixture<FruiteshomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FruiteshomeComponent]
    });
    fixture = TestBed.createComponent(FruiteshomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
