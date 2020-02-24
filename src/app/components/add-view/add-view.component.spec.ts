import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddViewComponent } from './add-view.component';

describe('AddViewComponent', () => {
  let component: AddViewComponent;
  let fixture: ComponentFixture<AddViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
