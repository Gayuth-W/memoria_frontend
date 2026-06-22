import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryCreate } from './memory-create';

describe('MemoryCreate', () => {
  let component: MemoryCreate;
  let fixture: ComponentFixture<MemoryCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoryCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(MemoryCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
