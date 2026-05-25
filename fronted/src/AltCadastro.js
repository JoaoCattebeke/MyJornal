import { useImmer } from 'use-immer';
import Button from 'react-bootstrap/Button';


export default function AltCadastro() {
  const [dataForm, setDataForm] = useImmer({
    username: '',
    email: '',
    senha: '',
    confirmarsenha: ''
  })

  function setUserName(e) {
    setDataForm(draft => {
      draft.username = e.target.value;
    });
  }

  function setEmail(e) {
    setDataForm(draft => {
      draft.email = e.target.value;
    });
  }

  function setSenha(e) {
    setDataForm(draft => {
      draft.senha = e.target.value;
    });
  }

  function setConfirmasenha(e) {
    setDataForm(draft => {
      draft.confirmarsenha = e.target.value;
    });
  }

  return (
    <>
        <div>
        Nome:
        <input
          value={dataForm.username}
          onChange={setUserName}
        />
        </div>
        <div>
        Email:
        <input
          value={dataForm.email}
          onChange={setEmail}
        />
        </div>
        <div>
        Senha:
        <input
          value={dataForm.senha}
          onChange={setSenha}
        />
        </div>
        <div>
        Confirmar Senha:
        <input
          value={dataForm.confirmarsenha}
          onChange={setConfirmasenha}
        />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
        <Button href='/logado'>Voltar</Button>
    </>
  )
}