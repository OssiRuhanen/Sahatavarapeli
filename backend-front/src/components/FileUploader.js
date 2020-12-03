import React, {useState} from 'react'
import axios from 'axios'
import {Form, FormGroup, Card, Button} from 'react-bootstrap'
import {backend} from './variables'

const FileUploader = (props) => {

    const [files, setFiles] = useState([])

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
    async function uploadFiles(files){ //file[]
        console.log("Starting upload")
        let retry = 0;
        while(files.length > 0 && retry < 3){
            if(await uploadFile(files[0])){
                retry = 0
                files.shift(); //removes first element
            }
            else{
                //console.log("Retry file")
                retry++;
            }
        }
        if(retry >= 3){
            console.log("Error","Failed to upload a file after multiple attempts")
        }
        else{
            console.log("Success","upload is completed")
        }
    }

    async function fileHandler(e){
        let file = e.target.files[0]
        if(!addFile(file)) console.log("Error", "Wrong File Type");
        // if(await uploadFile(file)){
        //     //handle success
        //     console.log("Success")
        // }
        // else{
        //     //handle error
        //     console.log("Error")
        // }

    }

    function addFile(file){
        console.log("filehandler",file);
        const fileTypes = /jpeg|jpg|png|gif/
        const isOfType = fileTypes.test(file.name)
        if(isOfType){
            setFiles(files.concat(file));
            return true;
        }
        else{
            return false;
        }
    }
    return (
        <>
        <Card>
            <Form>
                <FormGroup>
                    <Form.File onChange={(e)=>{fileHandler(e); e.target.value = null}} label="Image uploader"/>
                </FormGroup>
            </Form>
        </Card>
        <Button onClick={()=>{console.log(JSON.stringify(files))}}>log files</Button>
        <Button onClick={()=>{uploadFiles(files)}}>Upload files</Button>
        </>
    )
}


export default FileUploader