import React, { useEffect,useState } from "react";
import './comm.css'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Checkbox from '@mui/material/Checkbox';
import 'react-datepicker/dist/react-datepicker.css' ;
import DatePicker from 'react-datepicker';
import Button from '@mui/material/Button';
 export  default function Commander(){
  const prevBtns = document.querySelectorAll(".btn-prev");
  const nextBtns = document.querySelectorAll(".btn-next");
  const progress = document.getElementById("progress");
  const formSteps = document.querySelectorAll(".form-step");
  const progressSteps = document.querySelectorAll(".progress-step");
  let formStepsNum = 0;
  var comm_id =Date.now();
  
  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      formStepsNum++;
      updateFormSteps();
      updateProgressbar();
    });
  });
  
  prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      formStepsNum--;
      updateFormSteps();
      updateProgressbar();
    });
  });

  function updateFormSteps() {
    formSteps.forEach((formStep) => {
      formStep.classList.contains("form-step-active") &&
        formStep.classList.remove("form-step-active");
    });
  
    formSteps[formStepsNum].classList.add("form-step-active");
  }
  
  function updateProgressbar() {
    progressSteps.forEach((progressStep, idx) => {
      if (idx < formStepsNum + 1) {
        progressStep.classList.add("progress-step-active");
      } else {
        progressStep.classList.remove("progress-step-active");
      }
    });
  
    const progressActive = document.querySelectorAll(".progress-step-active");
  
    progress.style.width =
      ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
  }
  const [codesplit,setcodesplit]=useState('');
  const [nomsplit,setnomsplit]=useState('');
  const [Numcomm, setNumcomm]=useState();
  const [Modepaiement,setModepaiement]=useState('');
  const [Codeclient,setCodeclient]=useState('');
  const [Modelivraison,setModelivraison]=useState('');
  const [Lieulivraison,setLieulivraison]=useState('');
  const [Nbrfut,setNbrfut]=useState('');
  const [Vol,setVol]=useState('');
  const [Datecomm,setDatecomm]=useState(null);
  const [Infoarticlescommander,setInfoarticlescommander]=useState([]);
  const [PrixHT,setPrixHT]=useState("");
  const [Remise,setRemise]=useState(0);
  const [PrixTOT,setPrixTOT]=useState();

  const [quantite,setquantite]=useState("");
  const [montant,setmontant]=useState(0);
  const [Submitted,setSubmitted]=useState(false);
  const [error,setError]=useState(false);
  const [prixarticle,setprixarticle]=useState();
  const [prixarticles,setprixarticles]=useState();
  const [post,setpost]=useState({})
  const [checked, setChecked] = useState([]);
  
  const reset=()=>{
    setNumcomm("");
    setModepaiement("");
    setCodeclient('');
    setModelivraison('');
    setNbrfut('');
    setVol('');
    setDatecomm('');
    setInfoarticlescommander('');
    setPrixHT('');
    setRemise('');
    setPrixTOT('');
    setPrixHT('');
}

let k ;
  const handleToggle = (value) => () => {
    const currentIndex = checked.findIndex(v=>v.des === value.des);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(newChecked.findIndex(v=>v.des === value.des),1);
    }
    setChecked(newChecked);
  };

   const handleChange=(id,event)=>{
    const newChecked =checked.map(i=>{
      if( id === i.id){
        i[event.target.name]=event.target.value;
      }
      return i
    })    
    setChecked(newChecked);
   }

const montanttotale=()=>{
let i=quantite* prixarticle
setmontant(i)
}

const montantarticles=()=>{
let l=montanttotale()
setprixarticles(l)
}



  const submit=(mail,nom,prenom)=>{
  
    axios.post("http://localhost:5000/commande/ajoutercommande",{mail,nom,prenom,Numcomm,Codeclient,Modepaiement,Modelivraison,Lieulivraison,Nbrfut,Vol,Datecomm,Infoarticlescommander:checked,PrixHT:sum,Remise,PrixTOT:sum+(sum*20/100)+(sum*5/100)+0.600-(Remise)})
    .then(res => {
        if(res.status===200){
          reset();
          setSubmitted(true)
          const timer = setTimeout(() => {
            setSubmitted(false)
          }, 3000);
        }
        else{
          setError(true)
          const timer = setTimeout(() => {
            setError(false)
          }, 3000);
          setSubmitted("")
        }
    })
    .catch(err =>  {setError(true)
      const timer = setTimeout(() => {
        setError(false)
      }, 3000);
      setSubmitted("")
 })
}
var sum=0;

const [affiche1,setAffiche1]=useState([]) 
const [affiche2,setAffiche2]=useState([]) 
const [affiche3,setAffiche3]=useState([]) 


  useEffect(()=>{
    axios.get("http://localhost:5000/article/all")
    .then(res=>{ setAffiche1(res.data);
    })
    .catch(err=>{
      console.log("data not found")
    }) 

    axios.get("http://localhost:5000/user/tt")
    .then(res=>{ setAffiche2(res.data)
    })
    .catch(err=>{
      console.log("data not found")
    })

    axios.get("http://localhost:5000/modedepaiement/allModepaiement")
    .then(res=>{ setAffiche3(res.data);
    })
    .catch(err=>{
      console.log("data not found")
    })  

  
  },[])


  const [open, setOpen] = React.useState(false);
  const handleOpen = (el) => {
    setOpen(true);
   
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [affichenew,setAffichenew]=useState([]) ;
  const afficheracquis=(id)=>{
     
    const newaffiche= affiche2.filter(el=>el.identifiant==id)
    setAffichenew(newaffiche)


  }
   return(
   <div>
     {Submitted? <Alert className='success-pop' severity="success">
    <AlertTitle>Succès</AlertTitle>
      Article bien saisie
    </Alert>:null}
  <br></br>
  <br></br> <br></br>
 <form action="#" class="formadminvente">
 <h1 class="text-center">Commander</h1>
 
 <div class="progressbar">
   <div class="progress" id="progress"></div>
   
   <div
     class="progress-step progress-step-active"
     data-title="informations générales"
   ></div>
   <div class="progress-step" data-title="informations articles"></div>
   <div class="progress-step" data-title="articles details"></div>
   <div class="progress-step" data-title="montant details"></div>
 </div>
 
 <div class="form-step form-step-active">
 <div className="gridcommander">

     <div class="input-group">
 <label for="modelivraison">Code et sociéte client</label>

 <select  name="modelivraison" id="modelivraison" onChange={(e)=>setCodeclient(e.target.value)} value={Codeclient}>
    <option selected > -- Choisir le code et la sociéte du client -- </option>
    {affiche2.map((el)=>{
                  return (
                    <>
                    <option>
                      {el.identifiant}
                    </option>
                    </>
                  )
                })}
  
</select> 

</div>
<div class="input-group">
<label  className="labelbutt" for="Modepaiement">"cliquer pour afficher les informations du client"</label>

     <input  type="button"
       value="charger"   onClick={()=>{afficheracquis(Codeclient)}}  className="butt" />
</div>
{affichenew.map(el=>{  return ( <>
       
  <div class="input-group">
  <label for="Modepaiement">Nom</label>
     <input       value= {el.nom } disabled></input> </div>
     <div class="input-group">
     <label for="Modepaiement">Prénom</label>
     <input    value= {el.prenom} disabled></input> </div>
     <div class="input-group">
     <label for="Modepaiement">email</label>
     <input     value={el.mail} disabled></input> </div>
     
 
     
     
   
       </>
      )
    })}
   <div class="input-group">
     <label for="Modepaiement">Mode paiement</label>

     <select  name="modelivraison" id="modelivraison"  onChange={(e)=>setModepaiement(e.target.value)} value={Modepaiement} >
    <option selected > -- Choisir le mode de paiement-- </option>
    {affiche3.map((el)=>{
                  return (
                    <>
                    <option>
                     {el.Modedepaiement}
                    </option>
                    </>
                  )
                })}
</select> 

   </div>

   <div class="input-group">
     <label for="Modepaiement">Mode de livraison</label>

     <select  name="modelivraison" id="modelivraison"  onChange={(e)=>setModelivraison(e.target.value)} value={Modelivraison} >
    <option selected > -- Choisir le mode de livraison -- </option>
    <option>Propres moyen</option>
    <option>A domicile</option>
</select> 

   </div>
   <div class="input-group">
     <label for="position">Lieu de livraison</label>
     <input onChange={(e)=>setLieulivraison(e.target.value)} value={Lieulivraison}></input>
     </div>

     <div class="input-group">
     <label for="position">Nombre de fut</label>
     <input onChange={(e)=>setNbrfut(e.target.value)} value={Nbrfut}></input>
     </div>

     <div class="input-group">
     <label for="position">Volume en Litre</label>
     <input onChange={(e)=>setVol(e.target.value)} value={Vol}></input>
     </div>

   <div class="input-group">
     <label for="position">Date commande</label>
    <DatePicker 
    selected={Datecomm} 
    dateFormat='dd/MM/yyyy'
    minDate={new Date()}
    maxDate={new Date()}
    isClearable
    onChange={(e)=>setDatecomm(e)} 
    value={Datecomm} 
    />   
    </div>
    </div>
   <div class="">
 
       
     <a href="#" class="btnn btn-next  ml-auto">Suivant</a>
   
   </div>
 </div>
 
 <div class="form-step">
 <form action="/" method="POST">
        <table class="table table-commander">
        <thead className="text-primary">
                <tr>
                    <th>Code Article</th>
                    <th>Désignation</th>
                    <th>Prix(Par Litre)</th>
                    <th>Quantite disponible</th>
                    <th>Quantite demander</th>
                    
                </tr>
            </thead>
            <tbody>
              
                {affiche1.map((el,i)=>{
                  return (
                    <tr key={i}>
                  <td className="first-td-checkbox-commander">
                  <Checkbox
                  onClick={handleToggle({id:el._id,des:el.Designation,cd:el.CodeArticle,quan:el.quantite,pr:el.Prix})}
                  id="vehicle1"
                    edge="end"
                  />
                  <label for="vehicle1">{el.Designation}</label>
                  </td>
                  <td>{el.CodeArticle}</td>
                  <td>{el.Prix}</td>
                  <td>{el.Quantite}</td>
                  <td><input value={checked.quan} onChange={event=>handleChange(el._id,event)} name="quan" /></td>
                  </tr>
                  )
                })}
   </tbody>
   
        </table>
    </form>
   <div class="btns-group">
     <a href="#" class="btnn btn-prev">Précident</a>
     <a href="#" class="btnn btn-next ml-auto"   onClick={montanttotale} >Suivant</a>
   </div>
 </div>


 {/* étape 3 */}
 <div class="form-step">
 <form action="/" method="POST">
        <table class="table">
        <thead className="text-primary">
    <tr>
        <th>Désignation</th>
        <th>Code Article</th>
        <th>Quantite demander</th>
        <th>Prix (Par Litre)</th>
        <th>Prix quantité demander</th>
    </tr>
            </thead>
            <tbody>
            {checked.map(el=>{
      return ( <><tr>
        <td>{el.cd}</td>
        <td>{el.des}</td>
        <td>{el.quan}L</td>
        <td>{el.pr}DT</td>
        <td>{el.pr*el.quan}DT</td>
      </tr>
      </>
      )
    })}   
   </tbody>
  </table>
    </form> 
   <div class="btns-group">
     <a href="#" class="btnn btn-prev">Previous</a>
     <a href="#" class="btnn btn-next ml-auto" >Suivant</a>
   </div>
 </div>

 
 <div class="form-step">
 <div className="gridcommander">
 <div class="input-group">
     <label for="username">TOT HT</label>
     {checked.map(el=>{
       {sum+=el.pr*el.quan} })}  
     <input type="text" name="lieulivraison" id="lieulivraison" onChange={(e)=>setPrixHT(e.target.value)} value={sum} disabled/>
   </div>
   <div class="input-group">
     <label for="username">TOT TVA</label>
     <input type="text" name="lieulivraison" id="lieulivraison" value={sum*20/100} disabled/>
   </div>
   <div class="input-group">
     <label for="username">Remise</label>
     <input type="text" name="lieulivraison" id="lieulivraison"  onChange={(e)=>setRemise(e.target.value)} value={Remise} />
   </div>
   <div class="input-group">
     <label for="username">TOT TAXE</label>
     <input type="text" name="lieulivraison" id="lieulivraison" value={sum*5/100} disabled/>
   </div>
   <div class="input-group">
     <label for="username">TOT TTC</label>
     <input type="text" name="lieulivraison" id="lieulivraison" value={sum+(sum*20/100)+(sum*5/100)} disabled/>
   </div>
   <div class="input-group">
     <label for="username">Timbre</label>
     <input type="text" name="lieulivraison" id="lieulivraison" value={0.600} disabled/>
   </div>
   <div class="input-group">
     <label for="username">Totale en Dinar Tunisian</label>
     <input type="text" name="lieulivraison" id="lieulivraison"  value={sum+(sum*20/100)+(sum*5/100)+0.600-(Remise)} disabled/>
   </div>
   </div>
   <div class="btns-group">
     <a href="#" class="btnn btn-prev">Précident</a>
     {/* <a href="#" class="btnn btn-submit" onClick={()=>submit()} >Envoyer</a> */}
     {affichenew.map(el=>{  return ( <>
       
      
    
     <input value="Submit" class="btn ml-auto " onClick={()=>submit(el.mail,el.nom,el.prenom)} />   </>
                    )
                  })}


   </div>
 </div>
</form>
      <p>{error}</p>
      <p>{Submitted}</p>
 
</div>
)

}