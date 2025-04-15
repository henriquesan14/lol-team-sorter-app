import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateMatchmakingComponent } from './generate-matchmaking.component';

describe('GenerateMatchmakingComponent', () => {
  let component: GenerateMatchmakingComponent;
  let fixture: ComponentFixture<GenerateMatchmakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateMatchmakingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateMatchmakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
