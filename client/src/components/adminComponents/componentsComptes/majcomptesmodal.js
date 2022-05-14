import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { TextField,} from "@material-ui/core";
import axios from 'axios'
import { MenuItem,FormControl,InputLabel,Select } from '@mui/material';

function Majcomptesmodal(props) {
    const [societe, setsociete]=useState('');
    const [nom,setnom]=useState('')
    const [Prenom,setPrenom]=useState('')
    const [mail,setmail]=useState('')
    const [Identifiant,setIdentifiant]=useState('')
    const [password,setpassword]=useState('')
    const [usine,setusine]=useState('')
    const [Compagne,setCompagne]=useState('')
    const [acctype,setacctype]=useState('')
    const [Submitted,setSubmitted]=useState(false);
    const [error,setError]=useState(false);

    const reset=()=>{
        setsociete("");
        setnom("");
        setPrenom("");
        setmail("");
        setIdentifiant("");
        setpassword("");
        setusine("");
        setCompagne("");
        setacctype("");
  }

  useEffect(()=>{
      setsociete(props.data.societe)
      setnom(props.data.nom)
      setPrenom(props.data.prenom)
      setmail(props.data.mail)
      setIdentifiant(props.data.identifiant)
      setpassword(props.data.password)
      setusine(props.data.usine)
      setCompagne(props.data.compagne)
      setacctype(props.data.acctype)
  },[props])

  
    const submit=(e)=>{
        axios.put(`http://localhost:5000/user/update/${props.data._id}`,{societe:societe,nom,prenom:Prenom,mail:mail,usine,identifiant:Identifiant,acctype:acctype,password,compagne:Compagne})
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
  return (<>   
  <React.Fragment>
    <Modal
hideBackdrop
open={props.open}
onClose={props.handleClose}
aria-labelledby="child-modal-title"
aria-describedby="child-modal-description"
>
<Box sx={{ ...style, width: 1000, height:500 }}>
  <h2 id="child-modal-title">Mise à jour compte utilisateur</h2>
  <p id="child-modal-description">
    Vous pouvez mettre cette compte utilsateur à jour
  </p>
  <br></br>
  <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sociéte</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={societe}
            label="societe"
            variant="filled"
            onChange={(e)=>setsociete(e.target.value)}
        >
            <MenuItem value="Magasin génèrale">Magasin génèrale</MenuItem>
            <MenuItem value="Carrefour">Carrefour</MenuItem>
            <MenuItem value="Tunis city">Tunis city</MenuItem>
        </Select>
        </FormControl>

        <TextField variant="filled" id="demo-helper-text-misaligned-no-helper" 
        label="Identifiant"   value={Identifiant} onChange={(e)=>setIdentifiant(e.target.value)} />
        <TextField variant="filled" id="demo-helper-text-misaligned-no-helper" 
        label="Nom"   value={nom} onChange={(e)=>setnom(e.target.value)}/>
        <TextField variant="filled" id="demo-helper-text-misaligned-no-helper" 
        label="Prenom"   value={Prenom} onChange={(e)=>setPrenom(e.target.value)}/>
        <TextField variant="filled" id="demo-helper-text-misaligned-no-helper" 
        label="E-mail"    value={mail} onChange={(e)=>setmail(e.target.value)}/>
        <TextField variant="filled" id="demo-helper-text-misaligned-no-helper" 
        label="Mot de passe"   value={password} />
        <TextField variant="filled" id="demo-helper-text-misaligned-no-helper" 
        label="Usine"   value={usine} onChange={(e)=>setusine(e.target.value)}/>
        <TextField variant="filled" id="demo-helper-text-misaligned-no-helper" 
        label="Compagne"   value={Compagne} onChange={(e)=>setCompagne(e.target.value)} />

        <FormControl fullWidth>
        <InputLabel variant="filled" id="demo-simple-select-label">Type utilisateur</InputLabel>
        <Select
        required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={acctype}
            label="acctype"
            variant="filled"
            onChange={(e)=>setacctype(e.target.value)}
        >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="vente">Service Vente</MenuItem>
            <MenuItem value="depot">Service Depot</MenuItem>
            <MenuItem value="reglement">Service Réglement</MenuItem>
        </Select>
        </FormControl>
        
        <Button onClick={submit}>Envoyé</Button>
        <Button onClick={props.handleClose}>Fermer</Button>
</Box>
</Modal>
    </React.Fragment>
</>
    )
}

export default Majcomptesmodal