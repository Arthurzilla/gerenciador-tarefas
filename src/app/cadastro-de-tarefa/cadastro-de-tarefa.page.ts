import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  IonInput,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';

import { db } from '../firebase.config';
import { ref, onValue, push } from 'firebase/database';

@Component({
  selector: 'app-cadastro-de-tarefa',
  templateUrl: './cadastro-de-tarefa.page.html',
  styleUrls: ['./cadastro-de-tarefa.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonList,
    IonButton,
    IonInput,
    IonSelect,
    IonSelectOption
  ],
})
export class CadastroDeTarefaPage implements OnInit {
  constructor() {}

  titulo = '';
  descricao = '';
  responsavel: any = null; // agora será um objeto com id e nome
  novaEtapa: string = '';
  etapas: string[] = [];
  nomesDisponiveis: any[] = []; // lista de objetos: { id, nome }

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    const usuariosRef = ref(db, 'usuarios');

    onValue(usuariosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        this.nomesDisponiveis = Object.entries(data).map(([id, usuario]: any) => ({
          id,
          nome: usuario.nome
        }));
      }
    });
  }

  adicionarEtapa() {
    if (this.novaEtapa.trim()) {
      this.etapas.push(this.novaEtapa.trim());
      this.novaEtapa = '';
    }
  }

  removerEtapa(index: number) {
    this.etapas.splice(index, 1);
  }

  salvarTarefa() {
    const novaTarefa = {
      titulo: this.titulo,
      descricao: this.descricao,
      responsavel: this.responsavel, // objeto { id, nome }
      etapas: this.etapas.map((etapa) => ({
        nome: etapa,
        concluida: false
      })),
      dataCriacao: new Date().toISOString()
    };

    const tarefasRef = ref(db, 'tarefas');
    push(tarefasRef, novaTarefa)
      .then(() => {
        console.log('Tarefa salva com sucesso no Firebase');
        // limpar campos
        this.titulo = '';
        this.descricao = '';
        this.responsavel = null;
        this.etapas = [];
      })
      .catch((error) => {
        console.error('Erro ao salvar tarefa:', error);
      });
  }
}
