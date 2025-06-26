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
  },  {
    path: 'cadastro-usuario',
    loadComponent: () => import('./cadastro-usuario/cadastro-usuario.page').then( m => m.CadastroUsuarioPage)
  },
  {
    path: 'login-usuario',
    loadComponent: () => import('./login-usuario/login-usuario.page').then( m => m.LoginUsuarioPage)
  },

];
