import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellorrenthouseComponent } from './sellorrenthouse.component';

describe('SellorrenthouseComponent', () => {
  let component: SellorrenthouseComponent;
  let fixture: ComponentFixture<SellorrenthouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellorrenthouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellorrenthouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
