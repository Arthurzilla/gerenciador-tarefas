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
import { getDatabase, ref, set } from "firebase/database";
import { auth, db as firebaseDb } from 'src/app/firebase.config';
import { createUserWithEmailAndPassword } from "firebase/auth";

const db = getDatabase();

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

  constructor(private router: Router) {}

  ngOnInit() {}

  async cadastrar() {
    try {
      const cred = await createUserWithEmailAndPassword(auth, this.email, this.senha);
      const uid = cred.user.uid;

      await set(ref(db, 'usuarios/' + uid), {
        nome: this.nome,
        email: this.email,
        criadoEm: new Date().toISOString()
      });

      this.router.navigate(['/login-usuario']);
      console.log('Usuário cadastrado com sucesso!');

      await fetch('http://localhost/api/cadastrar.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: this.nome,
          email: this.email,
          uid: uid
        })
      });

    } catch (error: any) {
      console.error('Erro ao cadastrar:', error.message);
    }
  }
}