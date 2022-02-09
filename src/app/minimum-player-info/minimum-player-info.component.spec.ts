import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimumPlayerInfoComponent } from './minimum-player-info.component';

describe('MinimumPlayerInfoComponent', () => {
  let component: MinimumPlayerInfoComponent;
  let fixture: ComponentFixture<MinimumPlayerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinimumPlayerInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimumPlayerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
