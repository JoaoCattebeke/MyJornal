import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function PrimeiraPagina(){
    return (
        <Row>
            <h1>Primeira Página</h1>
            <Col>
                <Button href="/formCadastro">Formulário Cadastro</Button>
                <br></br>
                <Button href='/formLogin'>Formulário Login</Button>
            </Col>
        </Row>
    )
}
