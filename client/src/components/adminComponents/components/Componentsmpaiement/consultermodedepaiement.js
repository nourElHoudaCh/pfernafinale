import axios from 'axios'
import React,{useEffect,useState} from 'react';
import './loc.css'
import Majarticlemodal from './majarticlemodal';


  const Article=()=> { 
    

    const [id,setId]=useState('')
    
   const handleDelete=(id)=>{
     axios.delete(`http://localhost:5000/article/delete/${id}`)
     .then(res=>{if(res.status===200){
     const newaffiche= affiche.filter(el=>el._id!==id)
     setAffiche(newaffiche)
     }})
      .catch(err=>{console.log("not great")
    })
   }

   const [affiche,setAffiche]=useState([]) 
const loadarticles=()=>{
  axios.get("http://localhost:5000/article/all")
  .then(res=>{ setAffiche(res.data)
  })
  .catch(err=>{
    console.log("data not found")
  })
}
  useEffect(()=>{
   loadarticles()
  },[])

  const [open, setOpen] = React.useState(false);
  const handleOpen = (el) => {
    setOpen(true);
    setId(el)
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  
  
    return (
<main id="site-main">
<div class="container">
    
    <form action="/" method="POST">
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th>Code Article</th>
                    <th>Désignation</th>
                    <th>Prix</th>
                    <th>Modifier</th>
                    <th>Supprimer</th>
                </tr>
            </thead>
            <tbody>
            {affiche.map(el=>{
      return ( <><tr>
        <td>{el.Designation}</td>
        <td>{el.CodeArticle}</td>
        <td>{el.Prix}</td>
        <td> <a class="btn border-shadow update">
            <span  onClick={()=>handleOpen(el)} class="text-gradient"><i class="fas fa-pencil-alt"></i></span> </a></td>
        <td> <a class="btn border-shadow delete" >
            <span class="text-gradient"><i class="fas fa-times"  onClick={()=>handleDelete(el._id)}></i></span> </a></td>
      </tr>
      <Majarticlemodal loadarticles={loadarticles} open={open} data={id} handleClose={handleClose}/>
      
      </>
      )
    })}
           
   </tbody>
   
        </table>
    </form>
</div>
</main>)}
 export default Article ;