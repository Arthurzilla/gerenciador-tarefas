import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'cadastro-de-tarefa',
    loadComponent: () => import('./cadastro-de-tarefa/cadastro-de-tarefa.page').then( m => m.CadastroDeTarefaPage)
  },
  {
    path: 'lista-tarefa',
    loadComponent: () => import('./lista-tarefa/lista-tarefa.page').then( m => m.ListaTarefaPage)
  },
  {
    path: 'detalhes-tarefa/:id',
    loadComponent: () => import('./detalhes-tarefa/detalhes-tarefa.page').then( m => m.DetalhesTarefaPage)
  },
];
