import {useState} from 'react'
import Button from 'react-bootstrap/Button';
import './style/cadastro.css'

export default function FormLogin() {
  const [dataForm, setDataForm] = useState({
    email: '',
    senha: ''
  })

  const handleChangeValue = (event) => {
    setDataForm((dataForm) => ({
        ...dataForm,
        [event.target.name]: event.target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(dataForm)
  }

  return (
    <div className='form-container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input name='email' onChange={handleChangeValue} />
        </div>
        <div className='form-group'>
          <label htmlFor='senha'>Senha</label>
          <input name='senha' onChange={handleChangeValue} />
        </div>
        <div>
          <button type='submit'><Button href='/logado'>Submit</Button></button>
          <button type="button" class="back-button"><Button href='/'>Voltar</Button></button>
        </div>
      </form>
    </div>
  )
}