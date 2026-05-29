import React, { useState } from 'react';
import { ListaMaterias } from './db/dadosMaterias';
import Button from 'react-bootstrap/Button';


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
            <h2>Lista de Materias</h2>
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
                        <button onClick={() => handleClick(mat, materia)}>{mat}</button>
                    </li>
                ))}
                </ul>           
            </form>
            <Button href='/logado'>Voltar</Button>
        </div>
    );
}