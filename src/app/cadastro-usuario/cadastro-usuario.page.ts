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
import { RequisicaoService } from '../service/requicisao.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
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
export class CadastroUsuarioPage implements OnInit {
  nome = '';
  email = '';
  senha = '';

  constructor(
    public router: Router,
      public rs: RequisicaoService
    ) {}

  ngOnInit() {}

  async cadastrar() {
    if (!this.nome || !this.email || !this.senha) {
      alert("Preencha todos os campos.");
      return;
    }

    const fd = new FormData();
    fd.append('controller', 'cadastro-usuario');
    fd.append('nome', this.nome);
    fd.append('email', this.email);
    fd.append('senha', this.senha);

    this.rs.post(fd).subscribe({
      next: (res) => {
        console.log("Resposta:", res);
        this.router.navigate(['/login-usuario']);
        alert("Usuário cadastrado com sucesso!");
      },
      error: (err) => {

        console.error("Erro:", err);
        alert("Erro ao cadastrar usuário.");
      }
    });
  }
}