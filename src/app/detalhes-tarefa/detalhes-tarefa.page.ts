import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonList, IonLabel, IonItem, IonCheckbox, IonButton} from '@ionic/angular/standalone';

@Component({
  selector: 'app-detalhes-tarefa',
  templateUrl: './detalhes-tarefa.page.html',
  styleUrls: ['./detalhes-tarefa.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,  IonCard, IonCardTitle, IonCardHeader,  IonList, IonLabel, IonItem, IonCardContent, IonCheckbox, IonButton]
})
export class DetalhesTarefaPage implements OnInit {

   tarefa: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
     const id = Number(this.route.snapshot.paramMap.get('id'));
    const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
    this.tarefa = tarefas.find((t: any) => t.id === id);
  }

  atualizarEtapa(index: number) {
  const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
  const tarefaIndex = tarefas.findIndex((t: any) => t.id === this.tarefa.id);

  if (tarefaIndex !== -1) {
    tarefas[tarefaIndex].etapas[index].concluida = this.tarefa.etapas[index].concluida;
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }
}

salvarTarefa() {
  const tarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
  const tarefaIndex = tarefas.findIndex((t: any) => t.id === this.tarefa.id);

  if (tarefaIndex !== -1) {
    tarefas[tarefaIndex] = this.tarefa;
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

   this.router.navigate(['/lista-tarefa']);
}



  

}
