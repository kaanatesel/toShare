

import React from 'react';
import './main.css';
import toshareicon from '../Assets/toshareicon.png';

// React Popup
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import bcrypt from 'bcryptjs';

import db from '../firebase';
import { doc, getDoc } from "firebase/firestore";

import Cookies from 'universal-cookie';


import { Container, Row, Col, Navbar, Button, Form, Alert } from 'react-bootstrap';


const cookies = new Cookies();

class LogInModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            message: '',
            messageVariant: '',
            rememberme: false
        }

        this.hanldeInputChange = this.hanldeInputChange.bind(this);
    }

    async login(e) {
        e.preventDefault();

        const userDoc = doc(db, "users", this.state.nickname);
        const userSnap = await getDoc(userDoc);

        let success = false;

        if (userSnap.exists()) {

            if (bcrypt.compareSync(this.state.password, userSnap.data().password)) {
                success = true;

                const auth = bcrypt.hashSync("authentication", '$2a$10$CwTycUXWue0Thq9StjUM0u')
                cookies.set('nickname', this.state.nickname, { path: '/' });

                if (this.state.rememberme) {
                    cookies.set('auth', auth, { path: '/' },);
                }
                else {
                    cookies.set('auth', auth, { path: '/', maxAge: 3600 },);
                }

                window.location.href = '/todopage';
            }
        }

        if (!success) {
            this.setState({
                message: 'Username or password is wrong.',
                messageVariant: 'danger'
            });
        } else {
            this.setState({
                message: '',
                messageVariant: ''
            });
        }
    }

    hanldeInputChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
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
                                    <Form.Control name='nickname' onChange={this.hanldeInputChange} type="text" placeholder="Your username" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control name='password' onChange={this.hanldeInputChange} type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                    <Form.Check onChange={this.hanldeInputChange} name='rememberme' type="checkbox" label="Remember me" />
                                </Form.Group>
                                <Button onClick={(e) => this.login(e)} className='toSharePurpleBtn' type="submit">
                                    Submit
                                </Button>
                            </Form>
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

export default LogInModal;