import {useState} from 'react'
import Button from 'react-bootstrap/Button';

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
    <div className='Form'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input name='email' onChange={handleChangeValue} />
        </div>
        <div>
          <label htmlFor='senha'>Senha</label>
          <input name='senha' onChange={handleChangeValue} />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
      <Button href='/logado'>Logar</Button> 
    </div>
  )
}