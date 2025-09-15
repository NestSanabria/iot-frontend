import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMapper } from './role.mapper';

describe('RoleMapper', () => {
  let component: RoleMapper;
  let fixture: ComponentFixture<RoleMapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleMapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleMapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
