import React, { useState } from 'react';
import { ListaUsuarios } from './db/dadosUsarios';

export default function AdicionarAmigo() {
    const [busca, setBusca] = useState('');

    const amigos = []
    for (const index in ListaUsuarios){
        let usuario = ListaUsuarios[index];
        amigos.push(ListaUsuarios[index].username);
    }
    
    const amigosFiltrados = amigos.filter((amigo) =>
    amigo.toLowerCase().includes(busca.toLowerCase())
    );

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(amigosFiltrados)
        
    }
    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>Lista de Amigos</h2>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Buscar amigo..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                style={{ padding: '8px', width: '250px', marginBottom: '15px' }}
                />
                <ul>
                {amigosFiltrados.map((amigo, index) => (
                    <li key={index}>{amigo}</li>
                ))}
                </ul>           
                <button type='submit'>Submit</button>       
            </form>
        </div>
    );
}