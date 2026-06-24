import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import './style/cadastro.css'


export default function FormCadastro() {
  const [dataForm, setDataForm] = useState({
    username: '',
    email: '',
    senha: '',
    confirmarsenha: ''
  })

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
    <div className='form-container'>
      <h1>Cadastro</h1>
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
      <Button href='/'>Voltar</Button> 
    </div>
  )
}