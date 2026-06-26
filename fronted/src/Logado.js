import Button from 'react-bootstrap/Button';
import AcharMateria from './acharMateria';
import './style/logado.css'

export default function Logado(){
    return (
        <>
            <header class="cabecalho">
            <h1>MYJORNAL</h1>
                <nav class="menu" aria-label="Menu principal">
                    <button class="botao botao-menu" type="button">
                        <Button href='/adiconarAmigo'>Adicionar<br></br>Amigo</Button>
                        </button>
                    <button class="botao botao-menu" type="button">
                        <Button href='/pedidosRecebidos'>Pedidos<br></br>Recebidos</Button>
                    </button>
                    <button class="botao botao-menu" type="button">
                        <Button href='/solicitacoesAmizade'>Solicitações de<br></br>Amizade</Button>
                    </button>
                    <button class="botao botao-menu" type="button">
                        <Button href='/amigos'>Amigos</Button>
                    </button>
                    <button class="botao botao-conta" type="button">
                        <Button href='/conta'>Conta</Button>
                    </button>
                </nav>
            </header>
            <AcharMateria />
        </>
    )
}