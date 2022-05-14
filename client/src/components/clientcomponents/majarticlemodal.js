import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './facture.css'
import { TextField,} from "@material-ui/core";
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
function Majarticlemodal(props) {
    const [CodeArticle, setCodeArticle]=useState('');
    const [Designation,setDesignation]=useState('')
    const [Prix,setPrix]=useState('')
    const [Submitted,setSubmitted]=useState(false);
    const [error,setError]=useState(false);
    const reset=()=>{
        setCodeArticle("");
        setDesignation("");
        setPrix("");
  }

  useEffect(()=>{
      setCodeArticle(props.data.CodeArticle)
      setDesignation(props.data.Designation)
      setPrix(props.data.Prix)
  },[props])

    const submit=(e)=>{
        axios.put(`http://localhost:5000/article/update/${props.data._id}`,{CodeArticle,Designation,Prix})
        .then(res => {
            if(res.status===200){
              reset();
              setSubmitted(true)
              props.loadarticles()
              props.handleClose()
            }
            else{
              setError(true)
              
              setSubmitted("")
            }
        })
        .catch(err =>  {setError(true)
         
          setSubmitted("")
     })
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 8,
        pt: 2,
        px: 4,
        pb: 3,
      };
  return (
<>
<React.Fragment>
        <Modal
        hideBackdrop
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 1000, height:400 }}>
        <Col md="17">
            <Card className="card-user">
        <CardHeader>
                <CardTitle tag="h5">modifier votre profile Profile</CardTitle>
              </CardHeader>
         
           
              <CardBody>
                <Form>
                  <Row>
                  
                    <Col className="pl-1" md="4">
                   
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Nom</label>
                        <Input
                          defaultValue="Chet"
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Prénom</label>
                        <Input
                          defaultValue="Faker"
                          placeholder="Last Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address Email</label>
                        <Input
                          defaultValue="Melbourne, Australia"
                          placeholder="Home Address"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Mot de passe</label>
                        <Input
                          defaultValue="Melbourne, Australia"
                          placeholder="Home Address"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                
                   
                </Form>
              </CardBody>
            </Card>
          </Col>
          <div className="update ml-auto mr-auto">
                     
                   
          <Button
                        className="btn-roundd"
                        color="primary"
                        type="submit"
                      >
                        Update Profile
                      </Button>
                      <Button    className="btn-roundd"
                        color="primary" onClick={props.handleClose}>Fermer</Button>
                      </div>
                     
                    
                      

        </Box>
        
      </Modal>
            </React.Fragment>
      
</>
    )
}

export default Majarticlemodal