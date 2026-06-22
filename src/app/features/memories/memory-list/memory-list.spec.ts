import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoryList } from './memory-list';

describe('MemoryList', () => {
  let component: MemoryList;
  let fixture: ComponentFixture<MemoryList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoryList],
    }).compileComponents();

    fixture = TestBed.createComponent(MemoryList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
