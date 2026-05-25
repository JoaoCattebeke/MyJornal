import { useImmer } from 'use-immer';
import Button from 'react-bootstrap/Button';


export default function VerMateria() {
  const [dataForm, setDataForm] = useImmer({
    titulo: 'TITULO',
    texto: 'TEXTO',
    imagem: 'IMG', // src
    tipo: ''
  })

  return (
    <>
        <div>
            {dataForm.titulo}
        </div>
        <div>
            {dataForm.texto}
        </div>
            <img
            src={dataForm.imagem}
            alt="Falha ao carregar imagem"/>
        <div>
            <Button href='/logado'>Voltar</Button>
        </div> 
    </>
  )
}