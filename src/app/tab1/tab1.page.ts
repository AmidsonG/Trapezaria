import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { DatePipe } from '@angular/common';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})

export class Tab1Page implements OnInit {
@Input() selectedImage: string ='';
@Input() selectedTitle: string = '';
@Input() selectedDescription: string = '';
estrelasSelecionadas: number = 0; 
idPrato: number | undefined ; 

 //Abrir o Modal da Descrição dos Pratos
  isModalOpen = false;

 

  openModal(image: string, title: string, description: string, id: number) {
    this.selectedImage = image;
    this.selectedTitle = title;
    this.selectedDescription = description;
    this.idPrato=id;

    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;// Fechar o modal
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  //Lista de objectos ou JSON que trás os pratos, os nomes e as imagens 19-105

//Variavel que recebe os pratos
  public pratos: any[] = [];
  public pratosHoje: any[]=[];
  
  
  params = {} as any;


  constructor(private router: Router, 
    private httpService: HttpService,
    private datePipe: DatePipe, 
    private modalController: ModalController) {
    
  }
  setRating(rating: number){
    this.estrelasSelecionadas = rating;
  }


  ngOnInit() {
    this.params.page = 0;
    this.getPratos();
    this.getPratosDoDia();
  }
  
  avaliarPrato() {
       const avaliacaoData = {
          "id_do_prato": this.idPrato,
          "numero_de_estrelas": this.estrelasSelecionadas,
          "id_do_usuario": localStorage.getItem('user'),
        };
        this.httpService.enviarAvaliacaoPrato(avaliacaoData).subscribe();
  } 
    
  getPratos(event?:any){
    this.params.page +=1;
    this.httpService.getPratos(this.params).subscribe({
      next: (res:any)=>{
        this.pratos.push(...res);
        
      },
    })
  }

  getPratosDoDia(){
    const dataHoje = new Date().toISOString().substring(0, 10); // Obtém a data de hoje no formato "YYYY-MM-DD"
    console.log(`Data de hoje: ${dataHoje}`);
    this.httpService.getPratosDoDia(dataHoje).subscribe({
      next: (res:any)=>{
        this.pratosHoje.push(...res);
        
        
      },
    })
  }

  todosPratos(){
    this.router.navigate(['historico']);
  }






  

}



