import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaDetailComponent } from './diploma-detail.component';

describe('DiplomaDetailComponent', () => {
  let component: DiplomaDetailComponent;
  let fixture: ComponentFixture<DiplomaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
