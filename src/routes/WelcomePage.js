
import React from 'react';
import './main.css';
import toshareicon from '../Assets/toshareicon.png';

// React Popup
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { Container, Row, Col, Navbar, Nav, Button, Form } from 'react-bootstrap';

const LogInModal = () => (
    <Popup className='custompoup' trigger={<Button variant="outline-light">Login</Button>} modal>
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
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" placeholder="Your username" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember me" />
                        </Form.Group>
                        <Button className='toSharePurpleBtn' type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </Popup>
);

const SingInModal = () => (
    <Popup className='custompoup' trigger={<Button className='margin-left' variant="outline-light">Sing In</Button>} modal>
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
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" placeholder="Your username" />
                            <Form.Text className="text-muted">
                                It should be unique.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>How do you descirbe your self?</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option value="1">Unicorn</option>
                                <option value="2">Male</option>
                                <option value="3">Female</option>
                                <option value="4">Tree</option>
                            </Form.Select>
                        </Form.Group>

                        <Button className='toSharePurpleBtn' type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </Popup>
);


class MainContent extends React.Component {


    render() {
        return (
            <main>
                <Row>
                    <Col className='main-text'>
                        <h1>Effortlessly create a to-do list</h1>
                        <h1>and</h1>
                        <h1>share it with others</h1>
                        <h6 className='mt-5'>Most to-do list app can help you create a list but only toShare</h6>
                        <h6> enable you to share your to do list with others. </h6>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col className='main-text'>
                        <Button className='margin-right toSharePurpleBtn'>Try with test user</Button>
                        <SingInModal />
                    </Col>
                </Row>
            </main>
        );
    }
}


class NavBar extends React.Component {
    render() {
        return (
            <Navbar className='pt-4'>
                <Container>
                    <Navbar.Brand href="#home">
                        <div className='MainPageIcon'>
                            <img src={toshareicon} alt='main page icon' />
                            toShare
                        </div>
                    </Navbar.Brand>
                    <Nav className="align-items-center">
                        <Nav.Link className='navbar-link' href='/'>Home</Nav.Link>
                        <Nav.Link className='navbar-link' href='/todopage'>To Do page</Nav.Link>
                        <Nav.Link className='navbar-link' href='/credits'>Credits</Nav.Link>
                        <Nav.Link className='navbar-link' href='/share'>Share To Do</Nav.Link>
                    </Nav>
                    <LogInModal />
                </Container>
            </Navbar>
        );
    }
}

class WelcomePage extends React.Component {
    render() {
        return (
            <main id='maincontainter'>
                <NavBar />
                <Container className='pt-5' fluid="md">
                    <MainContent />
                </Container>
            </main>
        );
    }
}

export {
    WelcomePage,
    NavBar,
}