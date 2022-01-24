
import React from 'react';
import './main.css';
import toshareicon from '../Assets/toshareicon.png';

// React Popup
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import bcrypt from 'bcryptjs'

import db from '../firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";


import { Container, Row, Col, Navbar, Nav, Button, Form, Alert } from 'react-bootstrap';

import LogInModal from './LoginModal';

class SingInModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            password: '',
            passwordcheck: '',
            error: false,
            message: '',
            messageVariant: ''
        }

        this.hanldeInputChange = this.hanldeInputChange.bind(this);
    }

    hanldeInputChange(e) {
        const target = e.target;
        const name = target.name;

        this.setState({
            [name]: target.value
        });

        if (this.state.password !== this.state.passwordcheck) {
            this.setState({
                error: true
            });
        } else {
            this.setState({
                error: false
            });
        }
    }


    async singIn(e) {
        e.preventDefault();

        const hashedPassword = bcrypt.hashSync(this.state.password, '$2a$10$CwTycUXWue0Thq9StjUM0u');

        const userDoc = doc(db, "users", this.state.nickname);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
            this.setState({
                message: "The username already exists.",
                messageVariant: 'danger'
            });
            return;
        }

        setDoc(doc(db, "users", this.state.nickname), {
            nickname: this.state.nickname,
            password: hashedPassword,
            type: this.state.type
        }).then(() => {
            this.setState({
                message: 'The user is created now you can login.',
                messageVariant: 'success'
            });
        }).catch((error) => {
            this.setState({
                message: error,
                messageVariant: 'danger'
            });
        });
    }

    render() {
        return (
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
                                    <Form.Control name='nickname' onChange={this.hanldeInputChange} type="text" placeholder="Your username" />
                                    <Form.Text className="text-muted">
                                        It should be unique.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control name='password' onChange={this.hanldeInputChange} type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control name='passwordcheck' onChange={this.hanldeInputChange} type="password" placeholder="Confirm Password" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>How do you descirbe your self?</Form.Label>
                                    <Form.Select name='type' onChange={this.hanldeInputChange} aria-label="Default select example">
                                        <option value="null">Pick One</option>
                                        <option value="unicorn">Unicorn</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="tree">Tree</option>
                                    </Form.Select>
                                </Form.Group>

                                <Button onClick={(e) => this.singIn(e)} className={this.state.error ? 'toSharePurpleBtn disabled' : 'toSharePurpleBtn'} type="submit">
                                    Submit
                                </Button>
                            </Form>
                            {
                                this.state.password !== this.state.passwordcheck &&
                                <Alert className='mt-4' variant='danger'>
                                    Passwords don't match!
                                </Alert>
                            }
                            {
                                this.state.message !== '' &&
                                <Alert className='mt-4' variant={this.state.messageVariant}>
                                    {this.state.message}
                                </Alert>
                            }
                        </Col>
                    </Row>
                </Container>
            </Popup>
        );
    }
}


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
                    <Navbar.Brand href="/">
                        <div className='MainPageIcon'>
                            <img src={toshareicon} alt='main page icon' />
                            <p id='navbar-logo-text'>toShare</p>
                        </div>
                    </Navbar.Brand>
                    <Nav className="align-items-center">
                        <Nav.Link className='navbar-link' href='/'>Home</Nav.Link>
                        <Nav.Link className='navbar-link' href='/credits'>Credits</Nav.Link>
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