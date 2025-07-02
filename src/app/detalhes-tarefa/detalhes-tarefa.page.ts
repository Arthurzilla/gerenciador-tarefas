import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Database, ref, get, update } from '@angular/fire/database';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonList,
  IonLabel,
  IonItem,
  IonCheckbox,
  IonButton,
  IonProgressBar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-detalhes-tarefa',
  templateUrl: './detalhes-tarefa.page.html',
  styleUrls: ['./detalhes-tarefa.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonList,
    IonLabel,
    IonItem,
    IonCheckbox,
    IonButton,
    IonProgressBar
  ]
})
export class DetalhesTarefaPage implements OnInit {
  tarefa: any;
  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: Database
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    if (this.id) {
      const tarefaRef = ref(this.db, `tarefas/${this.id}`);
      const snapshot = await get(tarefaRef);
      if (snapshot.exists()) {
        this.tarefa = snapshot.val();
      } else {
        console.error('tarefa não encontrada');
      }
    }
  }

  async atualizarEtapa(index: number) {
    const etapaRef = ref(this.db, `tarefas/${this.id}/etapas/${index}/concluida`);
    const concluida = this.tarefa.etapas[index].concluida;
    await update(etapaRef, { '.value': concluida });
  }

  async salvarTarefa() {
    const tarefaRef = ref(this.db, `tarefas/${this.id}`);
    await update(tarefaRef, this.tarefa);
    this.router.navigate(['/lista-tarefa']);
  }

  get progresso(): number {
    if (!this.tarefa?.etapas?.length) return 0;
    const total = this.tarefa.etapas.length;
    const concluidas = this.tarefa.etapas.filter((e: any) => e.concluida).length;
    return concluidas / total;
  }

  get progressoPorcentagem(): string {
    return (this.progresso * 100).toFixed(2) + '%';
  }
}
