import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  public usuarios: any[]=[];
  username: string = '';
  userId = 0;
  
  params = {} as any;
  constructor(
    private httpService:HttpService,
    private router: Router
  ) {
    localStorage.getItem('user');
   }

  ngOnInit() {
    this.params.page = 0;
    this.getUsuario();
  }
  
  getUsuario(event?:any){
    this.params.page +=1;
    this.httpService.getUsuario(this.username).subscribe({
      next: (res:any)=>{
        
        this.usuarios.push(...res);

      },
    })
  }

}
