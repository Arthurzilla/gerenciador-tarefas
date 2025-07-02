import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Database, ref, onValue } from '@angular/fire/database';

@Component({
  selector: 'app-lista-tarefa',
  templateUrl: './lista-tarefa.page.html',
  styleUrls: ['./lista-tarefa.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ListaTarefaPage implements OnInit {

  tarefas: any[] = [];

  constructor(private router: Router, private database: Database) {}

  ngOnInit() {
    this.carregarTarefas();
  }

  carregarTarefas() {
    const tarefasRef = ref(this.database, 'tarefas');
    onValue(tarefasRef, (snapshot) => {
      const dados = snapshot.val();
      if (dados) {
        this.tarefas = Object.keys(dados).map(key => ({ id: key, ...dados[key] }));
      } else {
        this.tarefas = [];
      }
    });
  }

  abrirDetalhes(tarefaId: string) {
    this.router.navigate(['/detalhes-tarefa', tarefaId]);
  }

  getStatus(tarefa: any): string {
    const total = tarefa.etapas?.length || 0;
    const concluidas = tarefa.etapas?.filter((e: any) => e.concluida).length || 0;
    return concluidas === total && total > 0 ? '- Concluída' : '- Em andamento';
  }

  // Método para calcular o progresso (valor entre 0 e 1)
  getProgresso(tarefa: any): number {
    if (!tarefa?.etapas?.length) return 0;
    const total = tarefa.etapas.length;
    const concluidas = tarefa.etapas.filter((e: any) => e.concluida).length;
    return concluidas / total;
  }

    irParaCadastro() {
    this.router.navigate(['/cadastro-de-tarefa']);
  }

}
