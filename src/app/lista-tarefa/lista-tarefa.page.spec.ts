import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaTarefaPage } from './lista-tarefa.page';

describe('ListaTarefaPage', () => {
  let component: ListaTarefaPage;
  let fixture: ComponentFixture<ListaTarefaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaTarefaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
