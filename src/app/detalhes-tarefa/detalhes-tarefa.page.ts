import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardHeader, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-detalhes-tarefa',
  templateUrl: './detalhes-tarefa.page.html',
  styleUrls: ['./detalhes-tarefa.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,  IonCard, IonCardTitle, IonCardHeader, IonCardContent]
})
export class DetalhesTarefaPage implements OnInit {

   tarefa: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
     const id = Number(this.route.snapshot.paramMap.get('id'));
    const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
    this.tarefa = tarefas.find((t: any) => t.id === id);
  }

}
