import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-chefes',
  templateUrl: './modal-chefes.component.html',
  styleUrls: ['./modal-chefes.component.scss'],
})
export class ModalChefesComponent  implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}



}
