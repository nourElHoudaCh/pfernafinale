import React,{useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { TextField,} from "@material-ui/core";
import axios from 'axios'
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


const schema = yup.object().shape({

Modedelivraison:yup.string().min(4).max(15).required('Veuillez entrer le mode de livraison a mettre à jour').matches(/^[A-Za-z ]*$/, 'Veuillez entrer un mode de livraison valide'),
});

function MajModedelivraisonmodal(props) {

  const {
    handleSubmit,
    formState: {errors},
    control,reset
  } = useForm({
    resolver: yupResolver(schema)
  });

    const [Modedelivraison, setModedelivraison]=useState('');
    const [Codemodedelivraison,setCodemodedelivraison]=useState('')
    const [Submitted,setSubmitted]=useState(false);
    const [error,setError]=useState(false);



  useEffect(()=>{
      setModedelivraison(props.data.Modedelivraison)
      setCodemodedelivraison(props.data.Codemodedelivraison)
  },[props])


    const onSubmit=(data)=>{

      var Modedelivraison=(data.Modedelivraison);

        axios.put(`http://localhost:5000/modedelivraison/updateall/${props.data._id}`,{Codemodedelivraison,Modedelivraison})
        .then(res => {
            if(res.status===200){
              reset({Modedelivraison:''});
              setSubmitted(true)
              props.loadarticles()
              props.handleClose()
            }
            else{
              setError(true)
              setSubmitted("")
            }
        })
        .catch(err =>  {
          setError(true)
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
          <h2 id="child-modal-title">Mise à jour mode de livraison</h2>
          <p id="child-modal-description">
            Vous pouvez mettre ce mode de livraison à jour
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>

        <div>
        <TextField
            id="nomarticle"
            label="Code mode de livraison"
            variant="filled"
            placeholder="entrer le nom du mode de livraison"
            fullWidth
            margin="normal"
            value={Codemodedelivraison}
            disabled
            />
        </div>
 <div>
 <Controller
          name="modelivraison"
    control={control}
   
    render={({ field, formState }) => (

           <TextField
           {...field}
           defaultValue={Modedelivraison}
           label="Mode de livraison"
           error={!!formState.errors?.Modedelivraison}
           helperText={errors.Modedelivraison? errors.Modedelivraison?.message : ''} 
           fullWidth
            />
            )}
   
            />
 </div>

   <div>
        <Button type='submit'>Envoyer</Button>
        <Button onClick={props.handleClose}>Fermer</Button>
   </div>
        </form>
        </Box>
      </Modal>
            </React.Fragment>
      
</>
    )
}

export default MajModedelivraisonmodal
