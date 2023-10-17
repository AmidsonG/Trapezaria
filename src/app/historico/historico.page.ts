import { Component,Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {

  //Abrir o Modal da Descrição dos Pratos
  isModalOpen = false;

  selectedImage!: String;
  selectedTitle!: String;
  selectedDescription!: String;

  openModal(image: string, title: string, description: string) {
    this.selectedImage = image;
    this.selectedTitle = title;
    this.selectedDescription = description;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  //Lista de objectos ou JSON que trás os pratos, os nomes e as imagens 19-105


//Variavel que recebe os pratos
  public pratos: any[] = [];
  params = {} as any;


  constructor(private router: Router, private httpService: HttpService) {
  }
  ngOnInit() {
    this.params.page = 0;
    this.getPratos();
  }

  getPratos(event?:any){
    this.params.page +=1;
    this.httpService.getPratos(this.params).subscribe({
      next: (res:any)=>{
        this.pratos.push(...res);
        console.log(this.pratos,'pratos');
      },
    })
  }

  closeHistorico(){
    this.router.navigate(['/tabs/tab1']);
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}


