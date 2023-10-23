import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  selectedImage: string = '';
  selectedNome: string = '';
  idChefe: number | undefined;
  selectedDepartamento: string = '';
  selectedFuncao: string = '';
  selectedMorada: string = '';
  selectedEmail: string = '';
  estrelasSelecionadas: number = 0;

  mediaAvaliado: number = 0.0;
  totalAvaliado: number =0;
  public chefsAvaliados: any;
  public alertButtons = ['OK'];

  stars = [5, 4, 3, 2, 1];
  progress: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  maxProgress = 10; // Ajuste conforme necessário

  atualizarProgressBar(numeroDeEstrelas: number) {
    this.progress[numeroDeEstrelas]++;
  }

  isModalOpen = false;
  openModal(image: string, nome: string, id: number, departamento: string, funcao: string, morada: string, email: string) {
    this.selectedImage = image;
    this.selectedNome = nome;
    this.idChefe = id;
    this.selectedDepartamento = departamento;
    this.selectedFuncao = funcao;
    this.selectedMorada = morada;
    this.selectedEmail = email;
    this.isModalOpen = true;

    this.getChefesAvaliacoes(id);
    
  }

  closeModal() {
    this.isModalOpen = false;
  }


  public funcionario: any[] = [];
  params = {} as any;

  constructor(private router: Router, private httpService: HttpService) { }

  ngOnInit() {
    this.params.page = 0;
    this.getChefe();
  }

  setRating(rating: number) {
    this.estrelasSelecionadas = rating;
  }

  getChefe(event?: any) {
    this.params.page += 1;
    this.httpService.getChefe(this.params).subscribe({
      next: (res: any) => {
        this.funcionario.push(...res);
        console.log(this.funcionario, 'funcionario');
      },
      error: (error: any) => {

      }
    })
  }

  avaliarChefe() {
    const avaliacaoData = {
      "id_do_chefe": this.idChefe,
      "numero_de_estrelas": this.estrelasSelecionadas,
      "id_do_usuario": localStorage.getItem('user'),
    };
    this.httpService.enviarAvaliacaoChefe(avaliacaoData).subscribe();
  }

  onClick() { }

  

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  getChefesAvaliacoes(id: number) {

    this.httpService.getChefesAvaliados(id).subscribe((oRet) => {
     this.chefsAvaliados = oRet;
     this.totalAvaliado = this.chefsAvaliados.length;
     this.mediaAvaliado = this.totalAvaliado/2;
     this.chefsAvaliados.forEach((element :any, key:string) => {
      this.atualizarProgressBar(element.numero_de_estrelas);
      });
    });
  }
}


