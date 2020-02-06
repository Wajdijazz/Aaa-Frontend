import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsWorkComponent } from './details-work.component';

describe('DetailsWorkComponent', () => {
  let component: DetailsWorkComponent;
  let fixture: ComponentFixture<DetailsWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
