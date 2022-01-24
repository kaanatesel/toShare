import React from "react";
import './main.css';

import toshareicon from '../Assets/toshareicon.png';
import { Col, Container, ListGroup, Navbar, Row, Spinner } from "react-bootstrap";

import { doc, getDoc } from "firebase/firestore";

import { withRouter } from "./WithRouter";
import db from "../firebase";


class ShareToDo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            subtitle: '',
            text: '',
            listItems: [],
            todoid: '',
            data: false
        };
    }

    async componentDidMount() {
        const docidParam = this.props.docid;
        const docid = docidParam.substring(1);

        const tododoc = doc(db, "todos", docid);
        const todoSnap = await getDoc(tododoc);

        if (todoSnap.exists()) {
            this.setState({
                title: todoSnap.data().title,
                subtitle: todoSnap.data().subtitle,
                text: todoSnap.data().text,
                listItems: todoSnap.data().listItems,
                todoid: todoSnap.id,
                data: true
            });
        }
    }

    render() {

        let output;

        if (this.state.data) {
            output = <Col className="pb-4">
                <h4>{this.state.title}</h4>
                <hr />
                <h6>{this.state.subtitle}</h6>
                <hr />
                <p>{this.state.text}</p>
                <ListGroup>
                    {
                        this.state.listItems.map((item, id) => {
                            return <ListGroup.Item key={id}>{item}</ListGroup.Item>
                        })
                    }
                </ListGroup>
            </Col>;
        } else {
            output = <Spinner className="m-5" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>;
        }

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
                        {output}
                    </Row>
                </Container>
            </main>
        );
    }
}

export default withRouter(ShareToDo);