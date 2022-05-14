import  MenuArticle from './componentsstock/menustock';
import React, { useState } from 'react';
import Livraison from './componentsstock/commandenonlivrai';
import Ajouterstock from './componentsstock/ajouterstock';
import Bonsortie from './componentsstock/bonsortie';

function Stock() {
  const [commander, setCommander]=useState("");
const handleCommander=(comm)=>{
  setCommander(comm)
}
  return (
    
  <div className='navGC'>
      <MenuArticle handleCommander={handleCommander} />
      {commander==="Ajouter stock"? <Ajouterstock/>:
      commander==="Consulter comNonLIvrer"?<Livraison/>:
      commander==="bonsortie"?<Bonsortie/>
     :null}
      {/* <Acqui/>
      <MAJAcqui/>
      <Echant/>  */}
      {/*   <MAJCOM/>
      <MAJEC/>  */}
  </div>
     
  );
}

export default Stock;