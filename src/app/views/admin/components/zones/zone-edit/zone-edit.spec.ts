import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneEdit } from './zone-edit';

describe('ZoneEdit', () => {
  let component: ZoneEdit;
  let fixture: ComponentFixture<ZoneEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoneEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZoneEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
