import React, { useState } from 'react';
import { ListaMaterias } from './db/dadosMaterias';
import Button from 'react-bootstrap/Button';


export default function AcharMateria() {
    const [busca, setBusca] = useState('');

    const materias = [];
    for (const index in ListaMaterias){
        materias.push(ListaMaterias[index].titulo);
    }
    
    const materiasFiltrados = materias.filter((materia) =>
        materia.toLowerCase().includes(busca.toLowerCase())
    );

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(materiasFiltrados)
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
                {materiasFiltrados.map((materia, index) => (
                    <li key={index}>{materia}</li>
                ))}
                </ul>           
                <button type='submit'>Submit</button>       
            </form>
            <Button href='/logado'>Voltar</Button>
        </div>
    );
}