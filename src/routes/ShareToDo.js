import React from "react";
import './main.css';

import toshareicon from '../Assets/toshareicon.png';
import { Col, Container, ListGroup, Navbar, Row } from "react-bootstrap";

import avatar from '../Assets/tree_avatar.svg';

class ShareToDo extends React.Component {
    render() {
        return (
            <main id='maincontainter'>
                <Container className='mt-5 h-100 share-todo-container'>
                    <Row>
                        <Navbar.Brand href="#home">
                            <div className='popup-icon'>
                                <img src={toshareicon} alt='main page icon' />
                                toShare
                            </div>
                        </Navbar.Brand>
                    </Row>
                    <Row >
                        <Col>
                            <img id='profile-foto-share' src={avatar} alt='main page icon' />
                            <h3>Kaan Ateşel</h3>
                        </Col>
                    </Row>
                    <Row >
                        <Col className="pb-4">
                            <hr />
                            <h4>To do item 1</h4>
                            <hr />
                            <h6>sub title</h6>
                            <hr />
                            <p>Some quick example text to build on the card title and make up the bulk of
                                the card's content.
                            </p>
                            <ListGroup>
                                <ListGroup.Item>- Cras justo odio</ListGroup.Item>
                                <ListGroup.Item>- Dapibus ac facilisis in</ListGroup.Item>
                                <ListGroup.Item>- Morbi leo risus</ListGroup.Item>
                                <ListGroup.Item>- Porta ac consectetur ac</ListGroup.Item>
                                <ListGroup.Item>- Vestibulum at eros</ListGroup.Item>
                            </ListGroup>

                        </Col>
                    </Row>
                </Container>
            </main>
        );
    }
}

export default ShareToDo;