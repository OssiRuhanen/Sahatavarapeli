import React, {useState} from 'react'
import axios from 'axios'
import {Form, FormGroup, Card, Button} from 'react-bootstrap'
import {backend} from './variables'

const FileUploader = (props) => {

    const [files, setFiles] = useState([]) //array to store files

    function uploadFile(file){ //file is a object to be uploaded
        let fd = new FormData(); //file is sent using javascript FormData
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
                return true
            })
            .catch(function (error){
                //handle error
                return false
            })
    }

    //How this works:
    //1. method receives files array
    //2. while array is not empty and there are less than 3 attempts do:
    //3. Try to send file from 0 index of array
    //4. If it fails, increment retry and goto step 3. If it succeeds, remove element from index 0, thus putting moving elements up the array.
    async function uploadFiles(files){ //file[] of file objects
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

    //From the UI input to this code.
    //In this context, it's the Form.File element. Think of it as a input html element.
    //When a file is set using the button it calls the onChange. The e is the element of the caller.
    //does not support multiple files.
    async function fileHandler(e){
        let file = e.target.files[0] //e.target.files is where the files are, in this case however since it's a single file input there's only one in index 0
        if(!addFile(file)) console.log("Error", "Wrong File Type");
    }

    //Method for adding files to the files state
    function addFile(file){
        const fileTypes = /jpeg|jpg|png|gif/ // filter of accepted types
        const isOfType = fileTypes.test(file.name) // tests if file.name has fileTypes extension name
        if(isOfType){
            setFiles(files.concat(file)); //adds file to the array
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