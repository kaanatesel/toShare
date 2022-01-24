import React from 'react';
import './main.css';

import tree_avatar from '../Assets/tree_avatar.svg';
import male_avatar from '../Assets/male_avatar.svg';
import female_avatar from '../Assets/tree_avatar.svg';
import unicorn_avatar from '../Assets/unicorn_avatar.svg';

import toshareicon from '../Assets/toshareicon.png';

import removeIcon from '../Assets/remove.png';
import shareIcon from '../Assets/share.png';
import completeIcon from '../Assets/checked.png';

import bcrypt from 'bcryptjs'

import { Container, Row, Col, Card, Button, Form, Navbar, ListGroup, InputGroup, Alert, Spinner, FormControl } from 'react-bootstrap';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Cookies from 'universal-cookie';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import db from '../firebase';

const cookies = new Cookies();


class LeftColm extends React.Component {

    constructor(props) {
        super(props);
        const nickname = cookies.get('nickname');

        this.state = {
            avatar: '',
            nickname: nickname,
            completed: 0
        }
    }

    ReturnAvatar() {

        if (this.state.avatar === 'female') {
            return <img id='profile-foto' src={female_avatar} alt='main page icon' />;
        }

        if (this.state.avatar === 'male') {
            return <img id='profile-foto' src={male_avatar} alt='main page icon' />;
        }

        if (this.state.avatar === 'tree') {
            return <img id='profile-foto' src={tree_avatar} alt='main page icon' />;
        }

        if (this.state.avatar === 'unicorn') {
            return <img id='profile-foto' src={unicorn_avatar} alt='main page icon' />;
        }

        return null;
    }

    async componentDidMount() {
        const userDoc = doc(db, "users", this.state.nickname);
        const userSnap = await getDoc(userDoc);

        if (userSnap.exists()) {
            this.setState({
                avatar: userSnap.data().type,
                completed: userSnap.data().completed
            })
        }
    }

    logout(e) {
        cookies.set('auth', '', { path: '/' });
        cookies.set('nickname', '', { path: '/' });
        window.location.href = '/';
    }

    render() {

        return (
            <>
                <Row className='pt-5'>
                    <Col>
                        {this.ReturnAvatar()}
                        <h4>{this.state.nickname}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4 className='mt-4'>Complated ToDos: {this.state.completed}</h4>
                    </Col>
                </Row>
                <Row className='pt-5 pb-5 '>
                    <Col>
                        <Button onClick={(e) => this.logout(e)} className='margin-right toSharePurpleBtn'>Log Out</Button>
                    </Col>
                </Row>
            </>
        );
    }
}

class AddToDoModal extends React.Component {

    constructor(props) {
        super(props);

        const authcookie = cookies.get('auth');
        const nickname = cookies.get('nickname');
        if (authcookie === undefined && nickname === undefined) {
            window.location.href = '/';
        }
        if (authcookie !== undefined && !bcrypt.compareSync("authentication", authcookie)) {
            window.location.href = '/';
        }

        this.state = {
            listItems: [],
            nickname: nickname,
            todotitle: '',
            todosubtitle: '',
            todotext: '',
            message: '',
            messageVariant: ''
        };

        this.hanldeInputChange = this.hanldeInputChange.bind(this);
    }

    handleChangeTodoList(e, index) {
        let newListItems = this.state.listItems.slice();
        newListItems[index] = e.target.value;
        this.setState({
            listItems: newListItems
        });
    }

    hanldeInputChange(e) {
        const target = e.target;
        const name = target.name;

        this.setState({
            [name]: target.value
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
        addDoc(collection(db, "todos"), {
            title: this.state.todotitle,
            subtitle: this.state.todosubtitle,
            text: this.state.todotext,
            listItems: this.state.listItems,
            nickname: this.state.nickname
        }).then(() => {
            this.setState({
                message: 'To do is added.',
                messageVariant: 'success'
            });
            window.location.reload();
        }).catch((error) => {
            this.setState({
                message: error,
                messageVariant: 'danger'
            });
        });

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
                                    <Form.Control onChange={this.hanldeInputChange} name='todotitle' type="text" placeholder="Title" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Todo Sub Title</Form.Label>
                                    <Form.Control onChange={this.hanldeInputChange} name='todosubtitle' type="text" placeholder="SubTitle" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Todo Text</Form.Label>
                                    <Form.Control onChange={this.hanldeInputChange} name='todotext' as="textarea" rows="3" placeholder="Text" />
                                </Form.Group>
                                <ListGroup className='pb-4'>
                                    {
                                        this.state.listItems.map((item, index) => {
                                            return (
                                                <ListGroup.Item key={index}>
                                                    <InputGroup className="mb-3">
                                                        <Form.Control onChange={(e) => this.handleChangeTodoList(e, index)} type="text" value={item} />
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

class ShareButton extends React.Component {

    constructor(props) {
        super(props);
        const url = window.location.href;
        console.log(url.substring(0, url.length - 9) + '/share:' + this.props.docid);
        this.state = {
            todourl: url.substring(0, url.length - 9) + '/share:' + this.props.docid,
            message: '',
            messageVariant: ''
        }
    }

    handleCopy(e) {
        console.log("alkfdnhadfn")
        var copyText = document.getElementById("urlform");

        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText.value);

        this.setState({
            message: 'Copied!',
            messageVariant: 'success'
        });

    }

    render() {

        return (
            <Popup className='custompoup' trigger={<Button variant="outline-primary" className='m-1' type="submit">
                <img src={shareIcon} alt='' />
            </Button>} modal>
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
                            <InputGroup className="mb-3">
                                <FormControl
                                    value={this.state.todourl}
                                    disabled
                                    id='urlform'
                                />
                                <Button onClick={(e) => this.handleCopy(e)} variant="outline-primary" id="button-addon2">
                                    Copy
                                </Button>
                            </InputGroup>
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


class ToDoCard extends React.Component {


    async handleComplate(e, docid) {
        const userDoc = doc(db, "users", cookies.get('nickname'));
        const userSnap = await getDoc(userDoc);

        if (userSnap.exists()) {
            console.log(userSnap.data().completed + 1);

            const newComplate = userSnap.data().completed + 1;

            await updateDoc(userDoc, {
                completed: newComplate
            });

            this.handleDelete(e, docid);
        }
    }

    async handleDelete(e, docid) {
        await deleteDoc(doc(db, "todos", docid)).then(() => {
            window.location.reload();
        });
    }

    render() {
        return (
            <>
                <Card >
                    <Card.Body>
                        <Card.Title>{this.props.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{this.props.subtitle}</Card.Subtitle>
                        <Card.Text>
                            {this.props.text}
                        </Card.Text>
                        <ListGroup>
                            {
                                this.props.list.map((item, id) => {
                                    return <ListGroup.Item key={id}>{item}</ListGroup.Item>
                                })
                            }
                        </ListGroup>
                        <div className='text-center'>
                            <Button onClick={(e) => this.handleComplate(e, this.props.docid)} variant="outline-success" className='m-1' type="submit">
                                <img src={completeIcon} alt='' />
                            </Button>
                            <ShareButton docid={this.props.docid} />
                            <Button onClick={(e) => this.handleDelete(e, this.props.docid)} variant="outline-danger" className='m-1' type="submit">
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

    constructor(props) {
        super(props);
        const nickname = cookies.get('nickname');
        this.state = {
            todoList: [],
            nickname: nickname
        }
    }

    async componentDidMount() {

        const userDoc = doc(db, "users", this.state.nickname);
        const userSnap = await getDoc(userDoc);
        let todos = [];
        if (userSnap.exists()) {
            const todoDocs = query(collection(db, "todos"), where("nickname", "==", this.state.nickname));

            const todoes = await getDocs(todoDocs);
            todoes.forEach((doc) => {
                const todo = {
                    title: doc.data().title,
                    subtitle: doc.data().subtitle,
                    text: doc.data().text,
                    listItems: doc.data().listItems,
                    todoid: doc.id
                }
                todos.push(todo);
            });
        }
        this.setState({
            todoList: todos
        });
    }

    render() {

        let output = <Spinner className='ml-5' variant="light" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>;

        if (this.state.todoList !== null) {
            output = this.state.todoList.map((todo, idx) => (
                <Col key={idx}>
                    <ToDoCard title={todo.title} subtitle={todo.subtitle} text={todo.text} list={todo.listItems} id={idx} docid={todo.todoid} />
                </Col>
            ));
        }

        return (
            <>
                <Row xs={1} md={1} lg={3} className="g-4">
                    <Col><AddToDoCard /> </Col>
                    {output}
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