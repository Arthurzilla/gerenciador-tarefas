import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroDeTarefaPage } from './cadastro-de-tarefa.page';

describe('CadastroDeTarefaPage', () => {
  let component: CadastroDeTarefaPage;
  let fixture: ComponentFixture<CadastroDeTarefaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDeTarefaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
