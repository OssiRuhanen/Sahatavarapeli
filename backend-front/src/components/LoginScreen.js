import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {backend} from './variables';
import axios from 'axios';

const LoginScreen = (props) => {
    const [show, setShow] = useState(props.show || false) // modal show
    const [detail, setDetail] = useState("")
    let canLogin = true;

    function clickHandler(e){
        e.preventDefault();
        console.log(e.target.form[0].value);
        console.log(e.target.form[1].value);
        let un = e.target.form[0].value
        let pw = e.target.form[1].value

        console.log(backend.URL+'/login');
        if(canLogin){
            canLogin = false
            axios.post(backend.URL+'/login',{
                "username": un,
                "password": pw
            })
            .then(function (res){
                //handle successful request
                setDetail("Login Success")
                canLogin = true
                setShow(false)
            })
            .catch(function (err){
                //handle network error
                setDetail("Login Failed")
                canLogin = true
            })
        }
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
                <Form onChange={()=>{setDetail("")}}>
                    <Form.Group controlId="form-username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username"/>
                    </Form.Group>
                    <Form.Group controlId="form-password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"/>
                        <Form.Text className={detail == "Login Success" ? "text-success" : "text-danger"}>
                            {detail}
                        </Form.Text>
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