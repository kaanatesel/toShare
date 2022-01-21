import React from "react";
import { Col, Container, Row } from "react-bootstrap";

import { NavBar } from "./WelcomePage";

class Credits extends React.Component {
    render() {
        return (
            <main id='maincontainter'>
                <NavBar />
                <Container className='pt-5' fluid="md">
                    <Row >
                        <Col style={{
                            color: 'white'
                        }}>
                            <h1 >Credits for Icons</h1>
                            <a href="https://www.flaticon.com/free-icons/picking" title="picking icons">Picking icons created by photo3idea_studio - Flaticon</a>
                            <br />
                            <a href="https://www.flaticon.com/free-icons/paper" title="paper icons">Paper icons created by Nikita Golubev - Flaticon</a>
                            <br />
                            <a href="https://www.flaticon.com/free-icons/to-do-list" title="to do list icons">To do list icons created by Freepik - Flaticon</a>
                            <br />
                            <a href="https://www.flaticon.com/free-icons/trash" title="trash icons">Trash icons created by Pixelmeetup - Flaticon</a>
                            <br />
                            <a href="https://www.flaticon.com/free-icons/instagram-share" title="instagram share icons">Instagram share icons created by Freepik - Flaticon</a>
                            <br />
                            <a href="https://www.flaticon.com/free-icons/delete" title="delete icons">Delete icons created by Alfredo Hernandez - Flaticon</a>
                            <br />
                            <a href="https://www.flaticon.com/free-icons/tick" title="tick icons">Tick icons created by Roundicons - Flaticon</a>

                        </Col>
                    </Row>
                </Container>
            </main>
        );

    }
}

export default Credits;