import { useState } from 'react'

export default function Form() {
  const [dataForm, setDataForm] = useState({
    titulo: '',
    texto: '',
    imagem: [],
    tipo: [] //público ou para amigos
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
          <label htmlFor='titulo'>Titulo</label>
          <input name='titulo' onChange={handleChangeValue} />
        </div>
        <div>
          <label htmlFor='texto'>Texto</label>
          <input name='Texto' onChange={handleChangeValue} />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}