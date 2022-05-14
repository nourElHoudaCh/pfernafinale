import  Menumodepaiement from './Componentsmpaiement/menumodepaiement';
import React, { useState } from 'react';
import Ajoutermodepaieent from './Componentsmpaiement/ajoutmodepaiement.tsx';


function Appmodepaiement() {
  const [commander, setCommander]=useState("");
const handleCommander=(comm)=>{
  setCommander(comm)
}
  return (
    
  <div className='navGC'>
      <Menumodepaiement handleCommander={handleCommander} />
      {commander==="Ajouter Mode de paiement"? <Ajoutermodepaieent/>
     :null}
      
  </div>
     
  );
}

export default Appmodepaiement;