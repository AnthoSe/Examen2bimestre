import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubastaANComponent } from './subasta-an.component';

describe('SubastaANComponent', () => {
  let component: SubastaANComponent;
  let fixture: ComponentFixture<SubastaANComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubastaANComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubastaANComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
