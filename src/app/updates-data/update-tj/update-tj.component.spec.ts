import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTjComponent } from './update-tj.component';

describe('UpdateTjComponent', () => {
  let component: UpdateTjComponent;
  let fixture: ComponentFixture<UpdateTjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
