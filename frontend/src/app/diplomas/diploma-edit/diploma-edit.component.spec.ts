import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaEditComponent } from './diploma-edit.component';

describe('DiplomaEditComponent', () => {
  let component: DiplomaEditComponent;
  let fixture: ComponentFixture<DiplomaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
