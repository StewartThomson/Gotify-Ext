import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageViewComponent } from './message-view.component';

describe('MessageViewComponent', () => {
  let component: MessageViewComponent;
  let fixture: ComponentFixture<MessageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
