import React, { useState } from 'react';
import { ListaUsuarios } from './db/dadosUsarios';
import Button from 'react-bootstrap/Button';


export default function AdicionarAmigo() {
    const [busca, setBusca] = useState('');
    let amigo = ''

    const amigos = []
    for (const index in ListaUsuarios){
        amigos.push(ListaUsuarios[index].username);
    }
    
    const amigosFiltrados = amigos.filter((ami) =>
    ami.toLowerCase().includes(busca.toLowerCase())
    );

    const handleSubmit = (event) => {
        event.preventDefault()        
    }
    function handleClick(ami, amigo){
        amigo = ami;
        console.log(amigo);
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
                {amigosFiltrados.map((ami, index) => (
                    <li key={index}><button onClick={() => handleClick(ami, amigo)}>{ami}</button></li>
                ))}
                </ul>           
            </form>
            <Button href='/logado'>Voltar</Button>
        </div>
    );
}