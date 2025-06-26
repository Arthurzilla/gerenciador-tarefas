import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';


@Component({
  selector: 'app-lista-tarefa',
  templateUrl: './lista-tarefa.page.html',
  styleUrls: ['./lista-tarefa.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ListaTarefaPage implements OnInit, ViewWillEnter {

  tarefas: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
     this.carregarTarefas();
  }

  ionViewWillEnter(){
    this.carregarTarefas();
  }

  carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    this.tarefas = tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  }

  abrirDetalhes(tarefaId: number) {
    this.router.navigate(['/detalhes-tarefa', tarefaId]);
  }

  getStatus(tarefa: any): string {
  const total = tarefa.etapas.length;
  const concluidas = tarefa.etapas.filter((e: any) => e.concluida).length;

  return concluidas === total && total > 0 ? '- Concluída' : '- Em andamento';
}

}
