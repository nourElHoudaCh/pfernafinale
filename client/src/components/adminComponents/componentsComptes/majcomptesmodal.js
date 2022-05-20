import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { TextField,} from "@material-ui/core";
import axios from 'axios'
import { MenuItem,FormControl,InputLabel,Select } from '@mui/material';
import "./Ajoutclient.css"
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


const schema = yup.object().shape({

 email: yup.string().email(),
 password: yup.string().min(8).max(12).required('Veuillez entrer le mot de passe '),
 nom: yup.string().min(4).max(15).required('Veuillez entrer le nom ').matches(/^[A-Za-z ]*$/, 'Veuillez entrer un nom valide'),
 prenom: yup.string().min(4).max(15).required('Veuillez entrer le prénom ').matches(/^[A-Za-z ]*$/, 'Veuillez entrer un prénom valide'),
 societe:yup.string().min(4).max(15).required('Veuillez entrer la société').matches(/^[A-Za-z ]*$/, 'Veuillez entrer une société valide'),
});


function Majcomptesmodal(props) {
  const {
    handleSubmit,
    formState: {errors},
    control,reset
  } = useForm({
    resolver: yupResolver(schema)
  });

    const [societe, setsociete]=useState('');
    const [nom,setnom]=useState('')
    const [Prenom,setPrenom]=useState('')
    const [mail,setmail]=useState('')
    const [Identifiant,setIdentifiant]=useState('')
    const [password,setpassword]=useState('')
 
    const [acctype,setacctype]=useState('')
    const [Submitted,setSubmitted]=useState(false);
    const [error,setError]=useState(false);


  useEffect(()=>{
      setsociete(props.data.societe)
      setnom(props.data.nom)
      setPrenom(props.data.prenom)
      setmail(props.data.mail)
      setIdentifiant(props.data.identifiant)
      setpassword(props.data.password)
    
      setacctype(props.data.acctype)
  },[props])

  var test=true


    const onSubmit=(data)=>{
      var prenom=(data.prenom);
      var email=(data.email);
      var nom=(data.nom);
      var password=(data.password);
      var societe=(data.societe);
    

        axios.put(`http://localhost:5000/user/update/${props.data._id}`,{nom,prenom,email,acctype,societe, password})
        .then(res => {
          if(res.status===200){
            reset({prenom:'',nom:'', email: '',password: '',societe:''}) ;
            setSubmitted(true)
            props.loadarticles()
            props.handleClose()
            window.location.reload()
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
      top: '49%',
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
<Box sx={{ ...style, width: 800, height:550 }}>
  <h2 id="child-modal-title">Mise à jour compte utilisateur</h2>
  <p id="child-modal-description">
    Vous pouvez mettre ce compte utilsateur à jour(Rentrer les données pour la confirmation)
  </p><form onSubmit={handleSubmit(onSubmit)}>

<div  className='accmodalcss'>
<div>
        <TextField variant="standard" id="demo-helper-text-misaligned-no-helper" 
        label="Identifiant"   value={Identifiant} onChange={(e)=>setIdentifiant(e.target.value)}  fullWidth   disabled/></div>
  <div>
       
           <Controller
          name="societe"
    control={control}
   
    render={({ field, formState }) => (
        <TextField
        {...field}
        defaultValue={societe}
        label="Société"
        error={!!formState.errors?.societe}
        helperText={errors.societe? errors.societe?.message : ''} fullWidth
        />
    )}
   
    />
        </div>
       
 <div>
      
         <Controller
          name="nom"
    control={control}
   
    render={({ field, formState }) => (
        <TextField
        {...field}
        defaultValue={nom}
        label="Nom"
        error={!!formState.errors?.nom}
        helperText={errors.nom? errors.nom?.message : ''} fullWidth
        />
    )}
   
    />
         
      </div>
      <div>
      
   <Controller
          name="prenom"
    control={control}
   
    render={({ field, formState }) => (
        <TextField
        {...field}
        defaultValue={Prenom}
        label="Prénom"
        error={!!formState.errors?.prenom}
        helperText={errors.prenom? errors.prenom?.message : ''} fullWidth
        />
    )}
   
    />
        </div>
         <div>
      <Controller
          name="email"
    control={control}
   
    render={({ field, formState }) => (
        <TextField
        {...field}
        defaultValue={mail} 
        label="Email"
        error={!!formState.errors?.email}
        helperText={errors.email? errors.email.message : ''} fullWidth
        />
    )}
   
    />
         </div>
        <div>
       

<Controller
          name="password"
    control={control}
   
    render={({ field, formState }) => (
        <TextField
        {...field}
        defaultValue={password} 
        type="password"
        label="Mot de passe"
        error={!!formState.errors?.password}
        helperText={errors.password? errors.password.message : ''} fullWidth
        />
    )}
   
    />
        </div>
      

   <div>
        <FormControl   fullWidth>
        <InputLabel variant="filled" id="demo-simple-select-label">Type utilisateur</InputLabel>
        <Select
        required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={acctype}
            label="acctype"
            variant="standard"
            onChange={(e)=>setacctype(e.target.value)}
        >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="vente">Service Vente</MenuItem>
            <MenuItem value="depot">Service Depot</MenuItem>
            <MenuItem value="reglement">Service Réglement</MenuItem>
        </Select>
        </FormControl></div>
        <br></br>
    
     <div>
        <Button type='submit'>Envoyé</Button>
        <Button onClick={()=> window.location.reload()}>Fermer</Button> </div></div></form>
</Box>
</Modal>
    </React.Fragment>
</>
    )
}

export default Majcomptesmodal