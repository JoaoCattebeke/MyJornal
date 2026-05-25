import Button from 'react-bootstrap/Button';
import { ListaMaterias } from './db/dadosMaterias';


export default function VerMateria() {
    const materia = ListaMaterias[1];

    return (
        <>
            <div>
                {materia.titulo}
            </div>
            <div>
                {materia.texto}
            </div>
                <img
                src={materia.imagem}
                alt="Falha ao carregar imagem"/>
            <div>
                <Button href='/logado'>Voltar</Button>
            </div> 
        </>
    );
}