import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomePage } from './welcome.page';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

describe('WelcomePage', () => {
  let component: WelcomePage;
  let fixture: ComponentFixture<WelcomePage>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [WelcomePage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
