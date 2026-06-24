import React, { useState } from 'react';
import { ListaMaterias } from './db/dadosMaterias';
import Button from 'react-bootstrap/Button';
import './style/logado.css'


export default function AcharMateria() {
    const [busca, setBusca] = useState('');
    let materia = ''

    const materias = [];
    for (const index in ListaMaterias){
        materias.push(ListaMaterias[index].titulo);
    }
    
    const materiasFiltrados = materias.filter((mat) =>
        mat.toLowerCase().includes(busca.toLowerCase())
    );

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    function handleClick(mat, materia){
        materia = mat;
        console.log(materia);
    }
    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>PUBLICAÇÕES</h2>
            <section class="publicacoes" aria-label="Publicações recentes">
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Buscar materias..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                style={{ padding: '8px', width: '250px', marginBottom: '15px' }}
                />
                <ul>
                {materiasFiltrados.map((mat, index) => (
                    <li key={index}>
                        <article class="publicacao">
                            <div class="espaco-imagem">
                                <img src="https://media-public.canva.com/LrDro/MAGmDxLrDro/1/s3.jpg" alt="img1"></img>
                                <h3>
                                    <button onClick={() => handleClick(mat, materia)}>
                                        <Button href='/verMateria'>{mat}</Button>
                                    </button>
                                </h3>
                            </div>
                        </article>
                        
                    </li>
                ))}
                </ul>           
            </form>
            </section>
        </div>
    );
}