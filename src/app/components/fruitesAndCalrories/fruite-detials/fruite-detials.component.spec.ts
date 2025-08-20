import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruiteDetialsComponent } from './fruite-detials.component';

describe('FruiteDetialsComponent', () => {
  let component: FruiteDetialsComponent;
  let fixture: ComponentFixture<FruiteDetialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FruiteDetialsComponent]
    });
    fixture = TestBed.createComponent(FruiteDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
