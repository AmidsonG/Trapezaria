import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpService } from '../services/http.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  pin: string = '';
  errorMessage: string = '';

  type: boolean = true;
  constructor(private router: Router, 
    private alertController: AlertController, 
    private httpService: HttpService,
    
    ) { 
      
    }

  async validarLogin() {
    if (!this.pin) {
      this.errorMessage = 'Digite um PIN válido.';
      return;
    }

    try {
      const response = await this.httpService.validarLogin(this.pin).toPromise();

      if (response && response.length > 0) {
        // O PIN existe na API, o login é válido

        this.errorMessage = '';

         // Armazena o ID do usuário no serviço HttpService
        this.httpService.setUserId(response[0].id);

        // Verifique se o ID do usuário foi armazenado corretamente
        const userId = this.httpService.getUserId();
        if (userId !== null && userId !== undefined) {
          console.log('ID do Usuário:', userId);
        } else {
          
        }


        this.router.navigate(['tabs/welcome']);
        // Redirecionar para a página desejada após o login
      } else {
        // O PIN não existe na API, exibir mensagem de erro
        this.errorMessage = 'PIN inválido. Tente novamente.';
      }
    } catch (error) {
      // Tratar erros de comunicação com a API
      console.error('Erro de login:', error);
      this.errorMessage = 'Erro ao verificar o PIN. Tente novamente mais tarde.';
    }
  }


  ngOnInit() {
    
  }

  changeType(){
    this.type= !this.type;
  }

  goToHome(){
    this.router.navigate(['tabs/welcome']);
  }
}