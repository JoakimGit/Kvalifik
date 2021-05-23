import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddediteventComponent } from './addeditevent.component';

describe('AddediteventComponent', () => {
  let component: AddediteventComponent;
  let fixture: ComponentFixture<AddediteventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddediteventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddediteventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
