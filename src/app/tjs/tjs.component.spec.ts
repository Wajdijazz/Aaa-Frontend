import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TjsComponent } from './tjs.component';

describe('TjsComponent', () => {
  let component: TjsComponent;
  let fixture: ComponentFixture<TjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
