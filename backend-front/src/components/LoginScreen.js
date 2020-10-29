import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LoginScreen = (props) => {
    const [show, setShow] = useState(props.show || false) // modal show

    function clickHandler(e){
        e.preventDefault();
        setShow(false)
        console.log(e.target.form[0].value);
        console.log(e.target.form[1].value);
    }
    return (
        <Modal 
            show={show}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="form-username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username"/>
                    </Form.Group>
                    <Form.Group controlId="form-password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={clickHandler}>Submit</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                Footer
            </Modal.Footer>
        </Modal>
    );
}

export default LoginScreen;