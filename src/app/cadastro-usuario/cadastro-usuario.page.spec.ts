import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuarioCadastroPage} from './cadastro-usuario.page';

describe('CadastroUsuarioPage', () => {
  let component: UsuarioCadastroPage;
  let fixture: ComponentFixture<UsuarioCadastroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioCadastroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
