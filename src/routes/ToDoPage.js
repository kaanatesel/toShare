import React from 'react';
import './main.css';


import avatar from '../Assets/tree_avatar.svg';
import toshareicon from '../Assets/toshareicon.png';

import removeIcon from '../Assets/remove.png';
import shareIcon from '../Assets/share.png';
import completeIcon from '../Assets/checked.png';

import bcrypt from 'bcryptjs'

import { Container, Row, Col, Card, Button, Form, Navbar, ListGroup, InputGroup } from 'react-bootstrap';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Cookies from 'universal-cookie';

const cookies = new Cookies();


class LeftColm extends React.Component {
    render() {
        return (
            <>
                <Row className='pt-5'>
                    <Col>
                        <img id='profile-foto' src={avatar} alt='main page icon' />
                        <h4>Kaan Ateşel</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4 className='mt-4'>Complated ToDos: 10</h4>
                    </Col>
                </Row>
                <Row className='pt-5 pb-5 '>
                    <Col>
                        <Button className='margin-right toSharePurpleBtn'>Log Out</Button>
                    </Col>
                </Row>
            </>
        );
    }
}

class AddToDoModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listItems: []
        };

        const authcookie = cookies.get('auth');
        if (authcookie === undefined) {
            window.location.href = '/';
        }
        if (authcookie !== undefined && !bcrypt.compareSync("authentication", authcookie)) {
            window.location.href = '/';
        }
    }

    handleChange(e, index) {
        let newListItems = this.state.listItems.slice();
        newListItems[index] = e.target.value;
        this.setState({
            listItems: newListItems
        });
    }

    addListItem(e) {
        let newListItems = this.state.listItems.slice();
        newListItems = [...newListItems, ''];
        this.setState({
            listItems: newListItems
        });
    }

    submitForm(e) {
        e.preventDefault();
        console.log(this.state.listItems);
    }

    removeListItem(e, index) {
        e.preventDefault();
        let newListItems = this.state.listItems.slice();
        newListItems.splice(index, 1);
        this.setState({
            listItems: newListItems
        });
    }

    render() {
        return (
            <Popup className='custompoup' trigger={<Button className='AddToDoItem' variant="outline-light">Add To Do Item</Button>} modal>
                <Container>
                    <Row>
                        <Navbar.Brand href="#home">
                            <div className='popup-icon'>
                                <img src={toshareicon} alt='main page icon' />
                                toShare
                            </div>
                        </Navbar.Brand>
                    </Row>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Todo Title</Form.Label>
                                    <Form.Control type="text" placeholder="Title" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Todo Sub Title</Form.Label>
                                    <Form.Control type="text" placeholder="SubTitle" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Todo Text</Form.Label>
                                    <Form.Control as="textarea" rows="3" placeholder="Text" />
                                </Form.Group>
                                <ListGroup className='pb-4'>
                                    {
                                        this.state.listItems.map((item, index) => {
                                            return (
                                                <ListGroup.Item key={index}>
                                                    <InputGroup className="mb-3">
                                                        <Form.Control onChange={(e) => this.handleChange(e, index)} type="text" value={item} />
                                                        <Button onClick={(e) => this.removeListItem(e, index)} variant="danger">Remove</Button>
                                                    </InputGroup>
                                                </ListGroup.Item>
                                            );
                                        })
                                    }
                                </ListGroup>
                                <Button onClick={(e) => this.addListItem(e)} className='toSharePurpleBtn' type="button">
                                    Add List Item
                                </Button>
                                <hr />
                                <Button onClick={(e) => this.submitForm(e)} className='toSharePurpleBtn' type="button">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Popup>
        );
    }
}

class AddToDoCard extends React.Component {
    render() {
        return (
            <>
                <Card bg='success' >
                    <Card.Body>
                        <AddToDoModal />
                    </Card.Body>
                </Card>
            </>
        );
    }
}

class ToDoCard extends React.Component {
    render() {
        return (
            <>
                <Card >
                    <Card.Body>
                        <Card.Title>Card Title {this.props.id}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle {this.props.id}</Card.Subtitle>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <div className='text-center'>
                            <Button variant="outline-success" className='m-1' type="submit">
                                <img src={completeIcon} alt='' />
                            </Button>
                            <Button variant="outline-primary" className='m-1' type="submit">
                                <img src={shareIcon} alt='' />
                            </Button>
                            <Button variant="outline-danger" className='m-1' type="submit">
                                <img src={removeIcon} alt='' />
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </>
        );
    }
}

class ToDoDiv extends React.Component {
    render() {
        return (
            <>
                <Row xs={1} md={1} lg={3} className="g-4">
                    {Array.from({ length: 5 + 1 }).map((_, idx) => (
                        <Col key={idx}>
                            {idx === 0 ? <AddToDoCard /> : <ToDoCard id={idx} />}
                        </Col>
                    ))}
                </Row>
            </>
        );
    }
}

class ToDoPage extends React.Component {
    render() {
        return (
            <Container fluid="md" className='pt-5 h-100 '>
                <Row className='h-100'>
                    <Col xs={12} md={3} id='profile-col'>
                        <LeftColm />
                    </Col>
                    <Col xs={12} md={9}>
                        <ToDoDiv />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ToDoPage;