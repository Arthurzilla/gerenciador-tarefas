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
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-cadastro-de-tarefa',
  templateUrl: './cadastro-de-tarefa.page.html',
  styleUrls: ['./cadastro-de-tarefa.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonItem,
    IonLabel,
    IonList,
    IonButton,
    IonInput,
  ],
})
export class CadastroDeTarefaPage implements OnInit {
  constructor() {}

  tarefas: any[] = [];

  ngOnInit() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
      this.tarefas = JSON.parse(tarefasSalvas);
    }
  }

  titulo = '';
  descricao = '';
  responsavel = '';
  novaEtapa: string = '';
  etapas: string[] = [];

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

    // Pega as tarefas já salvas ou começa com array vazio
    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas') || '[]');

    // Adiciona nova tarefa ao array
    tarefasSalvas.push(tarefa);

    // Salva a lista atualizada
    localStorage.setItem('tarefas', JSON.stringify(tarefasSalvas));

    console.log('Tarefa salva:', tarefa);

    // Limpa o formulário depois de salvar
    this.titulo = '';
    this.descricao = '';
    this.responsavel = '';
    this.etapas = [];
  }
}
