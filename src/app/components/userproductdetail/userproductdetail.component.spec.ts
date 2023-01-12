import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserproductdetailComponent } from './userproductdetail.component';

describe('UserproductdetailComponent', () => {
  let component: UserproductdetailComponent;
  let fixture: ComponentFixture<UserproductdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserproductdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserproductdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
