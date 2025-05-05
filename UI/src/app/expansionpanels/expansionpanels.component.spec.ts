import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionpanelsComponent } from './expansionpanels.component';

describe('ExpansionpanelsComponent', () => {
  let component: ExpansionpanelsComponent;
  let fixture: ComponentFixture<ExpansionpanelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpansionpanelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpansionpanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
