import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionMapper } from './permission.mapper';

describe('PermissionMapper', () => {
  let component: PermissionMapper;
  let fixture: ComponentFixture<PermissionMapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionMapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionMapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
