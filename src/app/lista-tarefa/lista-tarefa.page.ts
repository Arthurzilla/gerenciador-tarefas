import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-tarefa',
  templateUrl: './lista-tarefa.page.html',
  styleUrls: ['./lista-tarefa.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ListaTarefaPage implements OnInit {

  tarefas: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
      this.tarefas = JSON.parse(tarefasSalvas);
    }
  }

  abrirDetalhes(tarefaId: number) {
    this.router.navigate(['/detalhes-tarefa', tarefaId]);
  }
}
