import Dialog from "./dialog";
import { FcDeleteRow} from 'react-icons/fc';
import React,{useEffect,useState, useRef} from 'react';
import axios from 'axios'
import './regler.css'
import Majarticlemodal from './Majcommandemodal';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import { FcViewDetails} from 'react-icons/fc';
export default function Reglfcture() {
  const idProductRef = useRef();
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    //Update
    nameProduct: ""
  });
  const handleDialog = (message, isLoading, nameProduct) => {
    setDialog({
      message,
      isLoading,
      //Update
      nameProduct
    });
  };

  const handleDeletecom=(id)=>{
    handleDialog("voulez vous vraiment annuler la facture numero", true, id,);
    idProductRef.current = id;
 
  }

;
  const areUSureDelete = (choose) => {
    
    if (choose) {
      axios.delete(`http://localhost:5000/facturation/delete/${idProductRef.current}`)
      .then(res=>{if(res.status===200){
      const newaffiche= affichecommandeclientvalider.filter(el=>el._id!==idProductRef.current)
      setAffichecommandeclientvalider(newaffiche);
  
      }})
       .catch(err=>{console.log("not great")
     })
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };
  const [data,setData]=useState();

  const [id,setId]=useState('') 
  const [open, setOpen] = React.useState(false);

  const handleOpen = (el) => {
    setOpen(true);
    setId(el)
  };
  const handleClose = () => {

    setOpen(false);
  };
  const [affichecommandeclientvalider,setAffichecommandeclientvalider]=useState([]) 
  const toutcommandesvalider=[];
  const loadcommandevalider=()=>{
    axios.get(`http://localhost:5000/facturation/allfactures`)
    .then(res=>{ setAffichecommandeclientvalider(res.data)
   
    })
    .catch(err=>{
      console.log("data not found")
    })
  }
    ;
    useEffect(()=>{
      loadcommandevalider();
     

     },[]);
  return (
    <>
   
      
      <form action="/" method="POST"  >
      <div className="tbalereglerv">
        <br></br> <br></br> <br></br> <br></br>
        <div class="cadre-table-scrollregler">
        <Card>
              <CardHeader>
                <CardTitle tag="h4">Liste des factures à régler</CardTitle>
              </CardHeader>
            
    <CardBody>
                <Table responsive>
                <thead className="text-primary">
                <tr>
               
                <th scope="col"   style={{ width: 500,  }}>numero facture</th >
                <th scope="col"   style={{ width: 500,  }}>Identifiant</th >
                <th scope="col"   style={{ width: 500,  }}>Nom et prénom</th >
                <th scope="col"   style={{ width: 500,  }}>date commandevalider</th >
                <th scope="col"   style={{ width: 500,  }}>date commandesaisie</th >
                <th scope="col"   style={{ width: 500,  }}>Mode de paiement</th >
                  
                    <th scope="col"  style={{ width: 100,  }}>Prix</th>
                    <th scope="col"  style={{ width: 100,  }}>régler</th>
                    <th scope="col"  style={{ width: 100,  }}>annuler</th>
              
                  
                    
                    
                 
                </tr>
                </thead>
            <tbody>
          
            {affichecommandeclientvalider.filter( el=>el.Modepaiement!="enligne" && el.etat==="valide" && el.acquit==='oui').map(el=>{
      return ( <><tr>
      
         <td   scope="row">{el.Numcomm}</td>
         <td   scope="row">{el.Codeclient}</td>
         <td   scope="row">{el.nomprenom}</td>
         <td   scope="row">{el.Datevalidationcomm}</td>
         <td   scope="row">{el.Datecomm}</td>
  
        <td  scope="row">{el.Modepaiement}</td>
        <td  scope="row">{el. PrixTOT}</td>
        <td >  <a class="btndetails border-shadowdetails ">
            <span  onClick={()=>{handleOpen(el)}} ><i class="fas fa-pencil-alt"> </i></span> </a></td>
            <td> <a class="btndelete border-shadowrefuse " >
            <span ><i   onClick={()=>handleDeletecom(el._id)} class="fas fa-times" >  </i></span> </a></td>

      </tr>
      <Majarticlemodal   loadcommandevalider={loadcommandevalider} open={open} data={id}handleClose={handleClose}/>
     
     
       
      </>
      )
    })}
             {dialog.isLoading && (
        <Dialog
          //Update
          nameProduct={dialog.nameProduct}
          onDialog={areUSureDelete}
          message={dialog.message}
        />
      )}   
   </tbody>
   
               
   </Table>
              </CardBody>
              </Card>
        </div></div>
    </form>

      </>
) }