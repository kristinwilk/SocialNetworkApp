/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NextNewsComponent } from './next-news.component';

describe('NextNewsComponent', () => {
  let component: NextNewsComponent;
  let fixture: ComponentFixture<NextNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
