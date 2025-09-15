import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMapper } from './user.mapper';

describe('UserMapper', () => {
  let component: UserMapper;
  let fixture: ComponentFixture<UserMapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
