import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { TextField,} from "@material-ui/core";
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios'

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
          <h2 id="child-modal-title">Mise à jour article</h2>
          <p id="child-modal-description">
            Vous pouvez mettre cette article à jour
          </p>
          <TextField
            id="nomarticle"
            label="Code de l'article"
            variant="filled"
            placeholder="entrer le nom de l'article"
            fullWidth
            margin="normal"
            value={CodeArticle}
           disabled
        
            />
           <TextField
            id="codearticle"
            label="Nom de l'article"
            variant="filled"
            placeholder="entrer le code de l'article"
            fullWidth
            margin="normal"
            onChange={(e)=>setCodeArticle(e.target.value)} 
            value={Designation}
            />
           <TextField
            id="prixarticle"
            label="Prix de l'article"
            variant="filled"
            placeholder="entrer le prix de l'article"
            fullWidth
            margin="normal"
            onChange={(e)=>setPrix(e.target.value)} 
            value={Prix}
          />
        <Button onClick={submit}>Envoyer</Button>
        <Button onClick={props.handleClose}>Fermer</Button>
        </Box>
      </Modal>
            </React.Fragment>
      
</>
    )
}

export default Majarticlemodal