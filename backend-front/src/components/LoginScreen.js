import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {backend} from './variables';
import axios from 'axios';


//Uses a modal for authentication
//This is useful for scenarios when submitting requests with expired authentication token
//Put simply, in App.js set the state of loginshow to true and this modal pops up. 
//For example in component prop, use a setShow={()=>{setLoginShow(true)}} and in the code call setShow()
//However, this does not re-attempt the previous request by the user.
const LoginScreen = (props) => {
    const [detail, setDetail] = useState("")// msg in the modal
    let canLogin = true; // prevents login spam

    //When login button is pressed
    function clickHandler(e){
        e.preventDefault(); //prevents form from refreshing the app
        let un = e.target.form[0].value
        let pw = e.target.form[1].value

        console.log(backend.URL+'/login');
        if(canLogin){
            canLogin = false
            //--------------Remove when working with a working backend remove this block
            canLogin = true
            props.setShow(false)
            //--------------
            axios.post(backend.URL+'/login',{
                "username": un,
                "password": pw
            })
            .then(function (res){
                //handle successful request
                setDetail("Login Success?")
                canLogin = true
                props.setShow(false)
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
            show={props.show}
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
                        <Form.Text className={detail === "Login Success" ? "text-success" : "text-danger"}>
                            {detail}
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={clickHandler}>Submit</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                
            </Modal.Footer>
        </Modal>
    );
}

export default LoginScreen;