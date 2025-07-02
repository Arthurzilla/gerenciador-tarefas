import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Database, ref, get, child, update } from '@angular/fire/database';


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
   id: string = '';

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private db: Database
  ) { }

  async ngOnInit() {
     this.id = this.route.snapshot.paramMap.get('id') || '';

     if(this.id){
      const tarefaRef = ref(this.db, `tarefas/${this.id}`);
      const snapshot = await get(tarefaRef);
      if(snapshot.exists()){
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
  const tarefaRef = ref(this.db, `tarefas/${this.id}`)
  await update(tarefaRef, this.tarefa);
    this.router.navigate(['/lista-tarefa']);
}
}
