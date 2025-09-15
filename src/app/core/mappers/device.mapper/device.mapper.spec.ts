import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMapper } from './device.mapper';

describe('DeviceMapper', () => {
  let component: DeviceMapper;
  let fixture: ComponentFixture<DeviceMapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceMapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceMapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
