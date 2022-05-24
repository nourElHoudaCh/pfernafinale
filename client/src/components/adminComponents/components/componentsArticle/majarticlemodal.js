import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { TextField,} from "@material-ui/core";
import { MenuItem,FormControl,InputLabel,Select } from '@mui/material';
import axios from 'axios'
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({

  Designation: yup.string().min(4).max(30).required("Veuillez entrer le nom  de l'eharticle").matches(/^[A-Za-z û é à ]*$/, 'Veuillez entrer un nom valide'),
  Prix: yup.number().required('Veuillez entrer le prix'),
  Description: yup.string().min(50).max(200).required('Veuillez entrer la description'),
  
 });
function Majarticlemodal(props) {
  const {
    handleSubmit,
    formState: {errors},
    control,reset
  } = useForm({
    resolver: yupResolver(schema)
  });
    const [CodeArticle, setCodeArticle]=useState('');
    const [Designation,setDesignation]=useState('')
    const [Prix,setPrix]=useState('')
    const [Description,setDescription]=useState('')
    const [Submitted,setSubmitted]=useState(false);
    const [error,setError]=useState(false);
  

  useEffect(()=>{
      setCodeArticle(props.data.CodeArticle)
      setDesignation(props.data.Designation)
      setDescription(props.data.Description)
      setPrix(props.data.Prix)
  },[props])

  const onSubmit=(data)=>{
      var Prix=(data.prix);

var  Designation=(data. Designation);
var Description=(data.Description);

        axios.put(`http://localhost:5000/article/update/${props.data._id}`,{CodeArticle, Designation,Prix,Description})
        .then(res => {
            if(res.status===200){
              reset({ Designation:'',Prix:'',Description: ''}) ;
              setSubmitted(true)
              props.loadarticles()
              props.handleClose()
            }
            else{
              setError(true)
              console.log('fma mochkl')
              setSubmitted("")
            }
        })
        .catch(err =>  {setError(true)
         
          setSubmitted("")
     })
    }
    const style = {
        position: 'absolute',
        top: '55%',
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
        <Box sx={{ ...style, width: 550, height:500 }}>
          <h2 id="child-modal-title">Mise à jour article</h2>
          <p id="child-modal-description">
            Vous pouvez mettre cette article à jour
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="codearticle"
            label="nom de l'article"
            variant="standard"
            placeholder="entrer le code de l'article"
            fullWidth
            margin="normal"
            onChange={(e)=>setCodeArticle(e.target.value)} 
            value={CodeArticle} disabled
            />
             <Controller
         name="Designation"
    control={control}
   
    render={({ field, formState }) => (
        <TextField
        {...field}
        defaultValue={Designation}
        label="Nom de l'article"
        error={!!formState.errors?.Designation}
        helperText={errors.Designation? errors.Designation?.message : ''} fullWidth
        />
    )}
   
    />
         
      <Controller
          name="Prix"
    control={control}
   
    render={({ field, formState }) => (
        <TextField
        {...field}
        defaultValue={Prix}
        margin="normal"
        label="Prix de l'article"
        error={!!formState.errors?.Prix}
        helperText={errors.Prix? errors.Prix?.message : ''}  fullWidth
        />
    )}
   
    />
    
          <div style ={{display:'flex', justifyContent:'space-between'}}>
          <Controller
          name="Description"
    control={control}
   
    render={({ field, formState }) => (
        <TextField
        {...field}
        defaultValue={Description}
      
        multiline
        rows={3}
        label=" Description de l'article"
        error={!!formState.errors?.Description}
        helperText={errors.Description? errors.Description?.message : ''}  fullWidth
        />
    )}
   
    />
  
</div><Button type='submit'>Envoyer</Button>
        <Button onClick={()=> window.location.reload()}>Fermer</Button></form>
        
        </Box>
      </Modal>
            </React.Fragment>
      
</>
    )
}

export default Majarticlemodal