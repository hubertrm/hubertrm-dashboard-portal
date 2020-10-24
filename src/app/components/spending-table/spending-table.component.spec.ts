import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingTableComponent } from './spending-table.component';

describe('SpendingTableComponent', () => {
  let component: SpendingTableComponent;
  let fixture: ComponentFixture<SpendingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpendingTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpendingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
