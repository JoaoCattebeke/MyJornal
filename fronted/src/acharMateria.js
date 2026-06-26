import { ListaMaterias } from './db/dadosMaterias';
import Button from 'react-bootstrap/Button';
import './style/logado.css'


export default function AcharMateria() {
    let materia = ''

    const materias = [];
    for (const index in ListaMaterias){
        materias.push(ListaMaterias[index].titulo);
    }

    function handleClick(mat, materia){
        materia = mat;
        console.log(materia);
    }
    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>PUBLICAÇÕES</h2>
            <section class="publicacoes" aria-label="Publicações recentes">
                {materias.map((mat, index) => (
                        <article class="publicacao">
                            <div class="espaco-imagem">
                                <img src="https://media-public.canva.com/LrDro/MAGmDxLrDro/1/s3.jpg" alt="img1"></img>
                            </div>
                        <h3>
                            <button onClick={() => handleClick(mat, materia)}>
                                <Button href='/verMateria'>{mat}</Button>
                            </button>
                        </h3>
                    </article>
                ))}
            </section>
        </div>
    );
}