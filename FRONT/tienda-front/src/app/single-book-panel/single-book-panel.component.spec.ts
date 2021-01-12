import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBookPanelComponent } from './single-book-panel.component';

describe('SingleBookPanelComponent', () => {
  let component: SingleBookPanelComponent;
  let fixture: ComponentFixture<SingleBookPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleBookPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBookPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
