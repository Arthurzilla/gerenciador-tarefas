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

  tarefas: any[] = [];

  titulo = '';
  descricao = '';
  responsavel = '';
  novaEtapa: string = '';
  etapas: string[] = [];

  // ✅ Lista de nomes fictícios para o select
  nomesDisponiveis: string[] = [
    'Ana Souza',
    'Bruno Lima',
    'Carla Mendes',
    'Daniel Rocha',
    'Eduarda Silva'
  ];

  ngOnInit() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
      this.tarefas = JSON.parse(tarefasSalvas);
    }
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
    const tarefa = {
      id: new Date().getTime(),
      titulo: this.titulo,
      descricao: this.descricao,
      responsavel: this.responsavel,
      etapas: this.etapas.map((etapa) => ({
        nome: etapa,
        concluida: false,
      })),
    };

    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas') || '[]');
    tarefasSalvas.push(tarefa);
    localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas));

    console.log('Tarefa salva:', tarefa);

    this.titulo = '';
    this.descricao = '';
    this.responsavel = '';
    this.etapas = [];
  }
}
