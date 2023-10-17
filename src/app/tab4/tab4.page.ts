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

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.params.page = 0;
    this.getCozinha();
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

}
