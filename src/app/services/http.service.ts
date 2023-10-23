import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable,BehaviorSubject, throwError, of, pipe } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class HttpService {

  private apiUrl = `${environment.baseUrl}${environment.usuario}`;
  private pratoId!: number;

  private userIdSubject: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  userId$: Observable<number | null> = this.userIdSubject.asObservable();

  getUserId(): number | null {
    return this.userIdSubject.value;
  }

  setUserId(userId: string) {
    localStorage.setItem('user', userId)
  }

  setIdPratoAvaliado(pratoId: number) {
    this.pratoId = pratoId;
  }

  getIdPratoAvaliado(): number | null {
    return this.pratoId;
  }
    
  login(pin: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private http: HttpClient
  ) { }

  getPratos(params:any){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjozMTU3NTUwMDgwLCJpYXQiOjE2OTU2NjIwODAsImp0aSI6IjYxYTgwOWJiN2I0ODQ0NDZhYTFlOWVmOWNhZGZlM2RhIiwidXNlcl9pZCI6MX0.yz2_-wH1Y6NK12wIxFyPvcZM8O-H9B5vEzs9EpZd5xo'; // Substitua pelo seu token real

    // Configurar o cabeçalho de autorização
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Fazer a solicitação HTTP usando o cabeçalho de autorização
    
    return this.http.get(`${environment.baseUrl}${environment.pratos}`, { headers });
  }

  getPratosDoDia(dataHoje:any){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjozMTU3NTUwMDgwLCJpYXQiOjE2OTU2NjIwODAsImp0aSI6IjYxYTgwOWJiN2I0ODQ0NDZhYTFlOWVmOWNhZGZlM2RhIiwidXNlcl9pZCI6MX0.yz2_-wH1Y6NK12wIxFyPvcZM8O-H9B5vEzs9EpZd5xo'; // Substitua pelo seu token real

    // Configurar o cabeçalho de autorização
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(`${environment.baseUrl}${environment.pratos}?search=${dataHoje}`);
    // Fazer a solicitação HTTP usando o cabeçalho de autorização
    return this.http.get(`${environment.baseUrl}${environment.pratos}?search=${dataHoje}`, { headers });
  }

  getChefe(params:any){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjozMTU3NTUwMDgwLCJpYXQiOjE2OTU2NjIwODAsImp0aSI6IjYxYTgwOWJiN2I0ODQ0NDZhYTFlOWVmOWNhZGZlM2RhIiwidXNlcl9pZCI6MX0.yz2_-wH1Y6NK12wIxFyPvcZM8O-H9B5vEzs9EpZd5xo'; // Substitua pelo seu token real

    // Configurar o cabeçalho de autorização
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${environment.baseUrl}${environment.funcionario}?funcao=chefe de cozinha`, {headers})
  }

  getUsuario( username:string): Observable<any>{
   
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjozMTU3NTUwMDgwLCJpYXQiOjE2OTU2NjIwODAsImp0aSI6IjYxYTgwOWJiN2I0ODQ0NDZhYTFlOWVmOWNhZGZlM2RhIiwidXNlcl9pZCI6MX0.yz2_-wH1Y6NK12wIxFyPvcZM8O-H9B5vEzs9EpZd5xo'; // Substitua pelo seu token real

    // Configurar o cabeçalho de autorização
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.get(`${environment.baseUrl}${environment.usuario}?nome=${username}`,{headers});
      
  }

  getOcupacao(params:any){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjozMTU3NTUwMDgwLCJpYXQiOjE2OTU2NjIwODAsImp0aSI6IjYxYTgwOWJiN2I0ODQ0NDZhYTFlOWVmOWNhZGZlM2RhIiwidXNlcl9pZCI6MX0.yz2_-wH1Y6NK12wIxFyPvcZM8O-H9B5vEzs9EpZd5xo'; // Substitua pelo seu token real

    // Configurar o cabeçalho de autorização
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(environment.baseUrl + environment.ocupacao, {headers});
  }

  getCozinha(params:any){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjozMTU3NTUwMDgwLCJpYXQiOjE2OTU2NjIwODAsImp0aSI6IjYxYTgwOWJiN2I0ODQ0NDZhYTFlOWVmOWNhZGZlM2RhIiwidXNlcl9pZCI6MX0.yz2_-wH1Y6NK12wIxFyPvcZM8O-H9B5vEzs9EpZd5xo'; // Substitua pelo seu token real

    // Configurar o cabeçalho de autorização
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${environment.baseUrl}${environment.cozinha}`, {headers});  
  }

  getAlimentosAvaliados(id:number){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjozMTU3NTUwMDgwLCJpYXQiOjE2OTU2NjIwODAsImp0aSI6IjYxYTgwOWJiN2I0ODQ0NDZhYTFlOWVmOWNhZGZlM2RhIiwidXNlcl9pZCI6MX0.yz2_-wH1Y6NK12wIxFyPvcZM8O-H9B5vEzs9EpZd5xo'; // Substitua pelo seu token real

    // Configurar o cabeçalho de autorização
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${environment.baseUrl}${environment.avaliacaoP}?id_do_prato=${id}`, {headers});
  }

  getChefesAvaliados(id:number){
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjozMTU3NTUwMDgwLCJpYXQiOjE2OTU2NjIwODAsImp0aSI6IjYxYTgwOWJiN2I0ODQ0NDZhYTFlOWVmOWNhZGZlM2RhIiwidXNlcl9pZCI6MX0.yz2_-wH1Y6NK12wIxFyPvcZM8O-H9B5vEzs9EpZd5xo'; // Substitua pelo seu token real

    // Configurar o cabeçalho de autorização
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${environment.baseUrl}${environment.avaliacaoCh}?id_do_chefe=${id}`, {headers});
  }

  getCozinhaAvalicao(){
    
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjozMTU3NTUwMDgwLCJpYXQiOjE2OTU2NjIwODAsImp0aSI6IjYxYTgwOWJiN2I0ODQ0NDZhYTFlOWVmOWNhZGZlM2RhIiwidXNlcl9pZCI6MX0.yz2_-wH1Y6NK12wIxFyPvcZM8O-H9B5vEzs9EpZd5xo'; // Substitua pelo seu token real

    // Configurar o cabeçalho de autorização
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${environment.baseUrl}${environment.avaliacaoCz}`, {headers});
  }

  validarLogin(pin: string): Observable<any> {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjozMTU3NTUwMDgwLCJpYXQiOjE2OTU2NjIwODAsImp0aSI6IjYxYTgwOWJiN2I0ODQ0NDZhYTFlOWVmOWNhZGZlM2RhIiwidXNlcl9pZCI6MX0.yz2_-wH1Y6NK12wIxFyPvcZM8O-H9B5vEzs9EpZd5xo'; // Substitua pelo seu token real

    // Configurar o cabeçalho de autorização
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}?codigo_entrada=${pin}`, {headers})
    .pipe(
      tap((response:any)=>{
        if (response && response.idUsuario){
          this.setUserId(response.idUsuario)
        }
      }),
      catchError(error=>{
        console.error('Erro de Login', error);
        return throwError('Erro ao verificar o Pin. Tente Novamente')
      })
    );
  }

  enviarAvaliacaoPrato(avaliacaoData: any): Observable <any> {
    console.log(avaliacaoData, 'avalia')
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjozMTU2NDA0ODE3LCJpYXQiOjE2OTQ1MTY4MTcsImp0aSI6IjQzNWQzM2Y5MTdmNTQ4ZjU4OGNhMjZhMmM4ODk5NjFkIiwidXNlcl9pZCI6MX0.AJ8dPLnJNOXni95rU_Wt-2he_l7fZOiamTX93w7zn3I' ; // Substitua pelo seu token real
    // Configurar o cabeçalho de autorização
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(environment.baseUrl+ environment.avaliacaoP, avaliacaoData,{headers});
  }

  enviarAvaliacaoChefe(avaliacaoData: any): Observable <any> {
    console.log(avaliacaoData, 'avalia')
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjozMTU3NTUwMDgwLCJpYXQiOjE2OTU2NjIwODAsImp0aSI6IjYxYTgwOWJiN2I0ODQ0NDZhYTFlOWVmOWNhZGZlM2RhIiwidXNlcl9pZCI6MX0.yz2_-wH1Y6NK12wIxFyPvcZM8O-H9B5vEzs9EpZd5xo' ; // Substitua pelo seu token real
    // Configurar o cabeçalho de autorização
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(environment.baseUrl+ environment.avaliacaoCh, avaliacaoData,{headers});
  }

  enviarAvaliacaoCozinha(avaliacaoDataC: any): Observable <any> {
    console.log(avaliacaoDataC, 'avalia')
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjozMTU3NTUwMDgwLCJpYXQiOjE2OTU2NjIwODAsImp0aSI6IjYxYTgwOWJiN2I0ODQ0NDZhYTFlOWVmOWNhZGZlM2RhIiwidXNlcl9pZCI6MX0.yz2_-wH1Y6NK12wIxFyPvcZM8O-H9B5vEzs9EpZd5xo' ; // Substitua pelo seu token real
    // Configurar o cabeçalho de autorização
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(environment.baseUrl+ environment.avaliacaoCz, avaliacaoDataC,{headers});
  }

 





  

  




  /*createData(data:any){
    return this.http.post(`${this.api}`,JSON.stringify(data), this.options);
  }*/

  /*readPratos(){
    return this.http.get(`${this.api}pratos`);
  }*/

  /*updateData(data:any){
    return this.http.put(`${this.api}`,JSON.stringify(data),this.options);
  }

  deleteData(){
    return this.http.delete(`${this.api}`)
  }*/

}
