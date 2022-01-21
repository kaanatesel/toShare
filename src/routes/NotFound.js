import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import { NavBar } from "./WelcomePage";

class NotFound extends React.Component {
    render() {
        return (
            <main id='maincontainter'>
                <NavBar />
                <Container className='pt-5' fluid="md">
                    <Row >
                        <Col style={{
                            color: 'white',
                            textAlign: 'center'
                        }}>
                            <h1>404 PAGE NOT FOUND</h1>
                        </Col>
                    </Row>
                </Container>
            </main>
        );

    }
}

export default NotFound;