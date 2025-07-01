import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
// ⚠️ ATENÇÃO AQUI: As importações mudaram para o Realtime Database
import { Database, ref, onValue } from '@angular/fire/database'; // Importe 'Database', 'ref', 'onValue'

@Component({
  selector: 'app-lista-tarefa',
  templateUrl: './lista-tarefa.page.html',
  styleUrls: ['./lista-tarefa.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ListaTarefaPage implements OnInit {

  tarefas: any[] = [];

  // O construtor está correto, injetando o 'Database' do Realtime Database
  constructor(private router: Router, private database: Database) {}

  ngOnInit() {
    this.carregarTarefas();
  }

  carregarTarefas() {
    // ✅ CORRETO: Cria uma referência para o nó 'tarefas' no Realtime Database
    const tarefasRef = ref(this.database, 'tarefas');

    // ✅ CORRETO: Usa 'onValue' para escutar os dados do Realtime Database
    onValue(tarefasRef, (snapshot) => {
      const dados = snapshot.val(); // Pega os dados do snapshot do Realtime Database
      console.log('Dados recebidos do Realtime Database:', dados);

      // O Realtime Database retorna um objeto de objetos, onde as chaves são os IDs.
      // Precisamos converter isso para um array de objetos para usar com *ngFor.
      if (dados) {
        this.tarefas = Object.keys(dados).map(key => ({ id: key, ...dados[key] }));
      } else {
        this.tarefas = []; // Se não houver dados, garante que o array esteja vazio
      }
    }, {
      // Opcional: callback de erro para depuração
      // (error) => {
      //   console.error("Erro ao carregar tarefas do RTDB:", error);
      // }
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

  irParaCadastro() {
    this.router.navigate(['/cadastro-de-tarefa']);
  }
}