import { useState } from 'react'
import Button from 'react-bootstrap/Button';


export default function FormMateria() {
  const [dataForm, setDataForm] = useState({
    titulo: '',
    texto: '',
    // imagem: '',
    tipo: '' //público ou para amigos
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
          <input name='texto' onChange={handleChangeValue} />
        </div>
        <div>
          <label htmlFor='gender'>Tipo</label>
          <div>
            <div>
              <input
                type='radio'
                name='tipo'
                value='soamigo'
                onChange={handleChangeValue}
              />
              <label htmlFor='soAmigos'>Só para amigos</label>
            </div>
            <div>
              <input
                type='radio'
                name='tipo'
                value='todoPublico'
                onChange={handleChangeValue}
              />
              <label htmlFor='todoPublico'>Público geral</label>
            </div>
          </div>
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
      <Button href='/logado'>Voltar</Button>
    </div>
  )
}