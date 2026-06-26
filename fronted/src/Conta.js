import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import './style/cadastro.css'
import './style/materia.css'


export default function Conta() {
  const [dataForm, setDataForm] = useState({
    username: '',
    email: '',
    senha: '',
    confirmarsenha: ''
  }) //user

  const handleChangeValue = (event) => {
    setDataForm((dataForm) => ({
        ...dataForm,
        [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(dataForm);
  }

  return (
    <>
      <header class="cabecalho">
        <h1>MYJORNAL</h1>
            <button type="button" class="botao botao-conta">Deslogar</button>
            <button type="button" class="botao botao-conta"><Button href='/logado'>Voltar</Button></button>
    </header>
    <div className='form-container'>
      <h1><h2>Informações da conta</h2></h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='username'>User Name</label>
          <input name='username' onChange={handleChangeValue} />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input name='email' onChange={handleChangeValue} />
        </div>
        <div className='form-group'>
          <label htmlFor='senha'>Senha</label>
          <input name='senha' type='password' onChange={handleChangeValue} />
        </div>
        <div>
          <label htmlFor='confirmarsenha'>Confirmar Senha</label>
          <input name='confirmarsenha' type='password' onChange={handleChangeValue} />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form> 
    </div>
    </>
  )
}