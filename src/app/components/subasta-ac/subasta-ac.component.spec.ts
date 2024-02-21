import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubastaACComponent } from './subasta-ac.component';

describe('SubastaACComponent', () => {
  let component: SubastaACComponent;
  let fixture: ComponentFixture<SubastaACComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubastaACComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubastaACComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
