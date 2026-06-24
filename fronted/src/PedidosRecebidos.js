import React, { useState } from 'react';
import { ListaUsuarios } from './db/dadosUsarios';
import Button from 'react-bootstrap/Button';
import './style/pedidosRecebidos.css'


export default function PedidosRecebidos() {
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
        <div >
            <header class="cabecalho">
                <h1>MYJORNAL</h1>
                <button class="botao botao-conta" type="button"><Button href='/logado'>Voltar</Button></button>
            </header>
            <section class="lista-pedidos" aria-label="Pedidos recebidos">
                <h2>Pedidos Recebidos</h2>
                <form onSubmit={handleSubmit}>
                    <input
                    type="text"
                    placeholder="Buscar amigo..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    />
                    <ul>
                    {amigosFiltrados.map((ami, index) => (
                        <li key={index}>
                            <div class="pedido">
                                <img src="" alt="Foto"></img>
                                <p>{ami}</p>
                                <div class="acoes">
                                <button class="botao aceitar" type="button" onClick={() => handleClick(ami, amigo)}>Aceitar</button>
                                <button class="botao rejeitar" type="button" onClick={() => handleClick(ami, amigo)}>Rejeitar</button>
                                </div>
                            </div>
                        </li>
                    ))}
                    </ul>
                </form>
            </section>
        </div>
    );
}