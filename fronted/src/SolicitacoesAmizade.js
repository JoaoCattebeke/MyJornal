import { ListaUsuarios } from './db/dadosUsarios';
import Button from 'react-bootstrap/Button';
import './style/pedidosRecebidos.css'


export default function SolicitacoesAmizade() {
    let amigo = ''

    const amigos = []
    for (const index in ListaUsuarios){
        amigos.push(ListaUsuarios[index].username);
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
                <h2>SOLICITAÇOES DE AMIZADE</h2>
                {amigos.map((ami, index) => (
                        <div class="pedido">
                            <img src="https://media-public.canva.com/0dv4k/MAD3tT0dv4k/1/s3.jpg" alt="Foto"></img>
                            <p>Antonio</p>
                            <div class="acoes">
                            <button class="botao aceitar" type="button" onClick={() => handleClick(ami, amigo)}>Cancelar Solicitação</button>
                            </div>
                        </div>
                ))}
            </section>
        </div>
    );
}
