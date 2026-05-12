import { useState } from 'react'

export default function Form() {
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
    event.preventDefault()
    console.log(dataForm)
  }

  return (
    <div className='Form'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>User Name</label>
          <input name='username' onChange={handleChangeValue} />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input name='email' onChange={handleChangeValue} />
        </div>
        <div>
          <label htmlFor='senha'>Senha</label>
          <input name='senha' onChange={handleChangeValue} />
        </div>
        <div>
          <label htmlFor='confirmarsenha'>Confirmar Senha</label>
          <input name='confirmarsenha' onChange={handleChangeValue} />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}