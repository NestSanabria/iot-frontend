import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneMapper } from './zone.mapper';

describe('ZoneMapper', () => {
  let component: ZoneMapper;
  let fixture: ComponentFixture<ZoneMapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoneMapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZoneMapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
