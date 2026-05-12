import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
function App() {
  return (
    <div className='App'>
      <h2>Formulario login</h2>
      {<BasicForm />}
      <Form />
    </div>
  )
}
 function BasicForm() {
  const [text, setText] = useState('')

  const handleChangeText = (event) => {
    setText(event.target.value)
  }

  return (
    <div>
      <h3>{text}</h3>
      <input name='text' onChange={handleChangeText} value={text} />
    </div>
  )
}
export default function Form() {
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
    </div>
  )
}