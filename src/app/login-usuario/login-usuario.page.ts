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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/app/firebase.config'; 
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  async entrar(){
    try{
      const cred = await signInWithEmailAndPassword(auth, this.email,this.senha);
      const token = await cred.user.getIdToken();

      sessionStorage.setItem('token', token);
      console.log("logado com sucesso")

      this.router.navigate(['lista-tarefa'])

    }catch (erro : any){
      console.error("Erro ao fazer login: ", erro.message)
    }
  }
}