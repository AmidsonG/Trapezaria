import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit{
  usersCount: any | number ;
  public ocupacao: any[] =[];
  params = {} as any;

  constructor(private router: Router, private httpService: HttpService) {}

  ngOnInit() {
    this.params.page += 1;
    this.getOcupacao();

  }

  getOcupacao(event?:any){
    this.params.page +=1;
    this.httpService.getOcupacao(this.params).subscribe({
      next: (res:any)=>{
        this.ocupacao.push(...res);
        this.usersCount= this.ocupacao;
        console.log(this.ocupacao,'usuario');

      }, 
      error: (error:any)=>{

      }
    })
    
  }
}
