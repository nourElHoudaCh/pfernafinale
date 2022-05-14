import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './clientnavbar.css';
import { styled } from '@mui/material/styles';
import axios from 'axios'
import React,{useEffect,useState} from 'react';
import Stack from '@mui/material/Stack';
import { orange } from '@mui/material/colors';
import jwt_decode from 'jwt-decode'
import rna from './logo rna.png'
export default function Acceuil() {
 
  const [affiche,setAffiche]=useState([]) 
  const loadarticles=()=>{
    axios.get("http://localhost:5000/article/all")
    .then(res=>{ setAffiche(res.data)
    })
    .catch(err=>{
      console.log("data not found")
    })
  }
  const [verif,setverif]=useState('');
    useEffect(()=>{
     loadarticles();
     var name=localStorage.getItem('token');
    
     var verif=jwt_decode(name).isverified ;
     setverif(verif);
    },[])
  
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700],
    },
  }));
  
  return (<div className='all' >
  <div  className='topacceuil' >
    <div className='alertwidth'>



  {verif=='false'?
   <Alert severity="warning">
   <AlertTitle>Warning</AlertTitle>
  Valider votre mail — <strong>vérifier!</strong>
 </Alert>:null}</div>
    <h1 className='acceuiltitle'>Régie Nationale Des Alcools</h1>
    
  </div>
 <br></br> 
 <br></br> 
 <br></br> 
  <h1 className='articletitle'>Les articles disponible</h1>
  <div className="grid-container">
   {affiche.map(el=>{
      return ( <>
      <div className='cards'>
       <Card sx={{ maxWidth: 345 }}bgcolor="primary.main">
         <br></br>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://www.pyrenees.ad/alimentacio/image/cache/wp/cj/data/1016256696-578x578.webp"
      />
      <CardContent bgcolor="primary.main">
        <Typography gutterBottom variant="h5" component="div">
        {el.Designation}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        L'alcool Mauvait goût ou technique est un alcool éthylique à 90° de TAV ayant les caractéristiques techniques suivantes.
        </Typography>
      </CardContent>
      <CardActions>
        
        <Button size="small">{el.Prix}dt</Button>
      </CardActions>
    </Card></div>
      </>
      )
    })}
   
    </div>

    <div  className='espace'></div>
    <div class="footer">


 
<h6><b>Siège: </b> Zone industrielle rades II, 1125 rades saline </h6>

<h6><b>Tel: </b> +216 79 457 155 </h6>

<img   className='rnalogo' src={rna}/>

<h6> Tunis ,Tunisie</h6>

 <h6><b>Fax:</b>216 79 457 184 </h6>
 
</div>
    </div>
  );
}



