import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalChefesPage } from './modal-chefes.page';

describe('ModalChefesPage', () => {
  let component: ModalChefesPage;
  let fixture: ComponentFixture<ModalChefesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalChefesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
