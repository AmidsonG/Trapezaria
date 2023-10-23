import { Component, OnInit} from '@angular/core';
import { HttpService } from '../services/http.service';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit{

  public cozinha: any[] =[];
  params = {} as any;


  estrelasSelecionadas: number = 0;
  idCozinha: number = 0;
  mediaAvaliado: number = 0.0;
  totalAvaliado: number =0;
  public cozinhaAvaliada: any;
  public alertButtons = ['OK'];

  stars = [5, 4, 3, 2, 1];
  progress: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  maxProgress = 10; // Ajuste conforme necessário

  atualizarProgressBar(numeroDeEstrelas: number) {
    this.progress[numeroDeEstrelas]++;
  }

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.params.page = 0;
    this.getCozinha();
    this.getCozinhaAvaliacao();
    
    
  }
  setRating(rating: number){
    this.estrelasSelecionadas = rating;
  }

  getCozinhaItems( id:number){
    this.idCozinha=id;
  }

  getCozinha(event?:any){
    this.params.page +=1;
    this.httpService.getCozinha(this.params).subscribe({
      next: (res:any)=>{
        this.cozinha.push(...res);
        console.log(this.cozinha, 'cozinha')
      }, 
      error: (error:any)=>{
      }
    })
    
  }

  avaliarCozinha(id: any) {
    const avaliacaoData = {
       "numero_de_estrelas": this.estrelasSelecionadas,
       "id_do_usuario": localStorage.getItem('user'),
       "id_da_cozinha": id
     };
     this.httpService.enviarAvaliacaoCozinha(avaliacaoData).subscribe();
} 

getCozinhaAvaliacao(){
  this.httpService.getCozinhaAvalicao().subscribe((oRet)=>{
    this.cozinhaAvaliada= oRet;
    this.totalAvaliado = this.cozinhaAvaliada.length;
    this.mediaAvaliado = this.totalAvaliado /2;
    this.cozinhaAvaliada.forEach((element:any, key:string)=>{
      this.atualizarProgressBar(element.numero_de_estrelas);
    });
  });
}

}
