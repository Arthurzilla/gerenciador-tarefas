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
import { Router, RouterLink } from '@angular/router';
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
    FormsModule,
    RouterLink
  ]
})
export class LoginUsuarioPage implements OnInit {
  public email: string = '';
  public senha: string = '';

  constructor(
    public router: Router,
    public autenticacao_service: AutenticacaoService
  ) {}

  ngOnInit() {}

  logar() {
    this.autenticacao_service.logar(this.email, this.senha).subscribe(
      (res: any) => {
        if (res.status === 'success') {
          sessionStorage.setItem('token', res.token);
          console.log('deu bom');
          this.router.navigate(['/lista-tarefa']);
        } else {
          console.log('deu ruim');
        }
      },
      (error) => {
        console.error('Erro na requisição:', error);
      }
    );
  }
}
