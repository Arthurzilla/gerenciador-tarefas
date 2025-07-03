import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonText
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../service/autenticacao.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.page.html',
  styleUrls: ['./login-usuario.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonText,
    CommonModule,
    FormsModule
  ]
})
export class LoginUsuarioPage implements OnInit {
  public email:string = '';
  public senha:string = '';

  constructor(
    public autenticacao_service:AutenticacaoService
    ) { }

  ngOnInit() {
  }

  async entrar(){
    this.autenticacao_service
    .logar(this.email,this.senha)
    .subscribe(
      (_res:any) =>{
          if (_res.status == 'sucess'){
            console.log("deu bom")
            sessionStorage.setItem('token', _res.token);
          }else{
            console.log("deu ruim")
          }
      }
    )
  }
}