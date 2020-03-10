import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanderVideoComponent } from './bander-video.component';

describe('BanderVideoComponent', () => {
  let component: BanderVideoComponent;
  let fixture: ComponentFixture<BanderVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanderVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanderVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
