import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomasListItemComponent } from './diplomas-list-item.component';

describe('DiplomasListItemComponent', () => {
  let component: DiplomasListItemComponent;
  let fixture: ComponentFixture<DiplomasListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomasListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomasListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
