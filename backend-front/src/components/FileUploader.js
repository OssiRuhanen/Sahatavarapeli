import React from 'react'
import axios from 'axios'
import {Form, FormGroup, Card} from 'react-bootstrap'
import {backend} from './variables'

const FileUploader = () => {

    function uploadFile(file){
        let fd = new FormData();
        fd.append("image",file)
        const req = axios.post(backend.URL+"/upload",
            fd, 
            {
                headers: 
                {
                    'Content-Type': 'multipart/form-data',
                    'processdata': false,
                }
            })
            return req
            .then(function (res){
                //handle success
                console.log("success")
                return true
            })
            .catch(function (error){
                //handle error
                console.log("error")
                return false
            })
    }

    async function fileHandler(e){
        console.log("filehandler",e.target.files[0]);
        let file = e.target.files[0]
        if(await uploadFile(file)){
            //handle success
            console.log("Success")
        }
        else{
            //handle error
            console.log("Error")
        }
    }
    return (
        <>
        <Card>
            <Form>
                <FormGroup>
                    <Form.File onChange={fileHandler} label="Image uploader"/>
                </FormGroup>
            </Form>
        </Card>
         
        </>
    )
}


export default FileUploader