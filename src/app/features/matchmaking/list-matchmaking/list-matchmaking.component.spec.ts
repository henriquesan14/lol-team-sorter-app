import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMatchmakingComponent } from './list-matchmaking.component';

describe('ListMatchmakingComponent', () => {
  let component: ListMatchmakingComponent;
  let fixture: ComponentFixture<ListMatchmakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMatchmakingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMatchmakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
