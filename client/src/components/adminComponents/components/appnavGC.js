import React, { useState } from 'react';
import Navbar from '../componentsGC/Navbar';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MAJCOM from '../componentsGC/pagesGC/majcom';
import MAJEC from '../componentsGC/pagesGC/majetatcom';
import Commander from '../componentsGC/pagesGC/commander';
import Acqui from '../componentsGC/pagesGC/acqui';
import Echant from  '../componentsGC/pagesGC/echantillon';


function GC() {
  const [commander, setCommander]=useState("");
const handleCommander=(comm)=>{
  setCommander(comm)
}
  return (
    
  <div className='navGC'>
      <Navbar handleCommander={handleCommander} />
      {commander==="MAJ acquis a cotions"? <Acqui/>:
      commander==="Commander"?<Commander />:
      commander==="MAJ état comamndes"?<MAJEC />
     :null}
      {/* <Acqui/>
      <MAJAcqui/>
      <Echant/>  */}
      {/*   <MAJCOM/>
      <MAJEC/>  */}
  </div>
     
  );
}

export default GC;