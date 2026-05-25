import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import AcharMateria from './acharMateria';

export default function Logado(){
    return (
        <Row>
            <h1>Página Logada</h1>
            <Col>
                <Button href="/formMateria">Formulario Criar Matéria</Button>
                <br></br>
                <Button href="/altCadastro">Alterar Cadastro</Button>
                <br></br>
                <Button href='/verMateria'>Ver Matéria</Button>
                <br></br>
                <Button href='/adicionarAmigo'>Adicionar Amigo</Button>
                < AcharMateria/>
            </Col>
        </Row>
    )
}