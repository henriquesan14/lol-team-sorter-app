import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormPlayerComponent } from './form-player.component';



describe('FormPlayerComponent', () => {
  let component: FormPlayerComponent;
  let fixture: ComponentFixture<FormPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
