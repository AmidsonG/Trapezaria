import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})

export class Tab1Page implements OnInit {
  @Input() selectedImage: string = '';
  @Input() selectedTitle: string = '';
  @Input() selectedDescription: string = '';
  estrelasSelecionadas: number = 0;
  idPrato: number | undefined;
  mediaAvaliado: number = 0.0;
  totalAvaliado: number =0;
  public alertButtons = ['OK'];

  stars = [5, 4, 3, 2, 1];
  progress: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  maxProgress = 10; // Ajuste conforme necessário

  atualizarProgressBar(numeroDeEstrelas: number) {
    this.progress[numeroDeEstrelas]++;
  }

  //Abrir o Modal da Descrição dos Pratos
  isModalOpen = false;


  openModal(image: string, title: string, description: string, id: number) {
    this.selectedImage = image;
    this.selectedTitle = title;
    this.selectedDescription = description;
    this.idPrato = id;

    this.isModalOpen = true;
    this.getPratosAvaliacoes(id);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  //Lista de objectos ou JSON que trás os pratos, os nomes e as imagens 19-105

  //Variavel que recebe os pratos
  public pratos: any[] = [];
  public pratosHoje: any[] = [];
  public pratosAvaliados: any;



  params = {} as any;


  constructor(private router: Router,
    private httpService: HttpService,
    private datePipe: DatePipe,
    ) {
  }


  setRating(rating: number) {
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
    this.getPratosAvaliacoes(Number(this.idPrato));
  }

  getPratos(event?: any) {
    this.params.page += 1;
    this.httpService.getPratos(this.params).subscribe({
      next: (res: any) => {
        this.pratos.push(...res);

      },
    })
  }

  getPratosAvaliacoes(id: number) {

    this.httpService.getAlimentosAvaliados(id).subscribe((oRet) => {
     this.pratosAvaliados = oRet;
     this.totalAvaliado = this.pratosAvaliados.length;
     this.mediaAvaliado = this.totalAvaliado/2;
     this.pratosAvaliados.forEach((element :any, key:string) => {
      this.atualizarProgressBar(element.numero_de_estrelas);
      });
    });
  }

  getPratosDoDia() {
    const dataHoje = new Date().toISOString().substring(0, 10); // Obtém a data de hoje no formato "YYYY-MM-DD"
    console.log(`Data de hoje: ${dataHoje}`);
    this.httpService.getPratosDoDia(dataHoje).subscribe({
      next: (res: any) => {
        this.pratosHoje.push(...res);
        console.log(this.pratosHoje, 'pratos');

      },
    })
  }

  todosPratos() {
    this.router.navigate(['historico']);
  }








}



